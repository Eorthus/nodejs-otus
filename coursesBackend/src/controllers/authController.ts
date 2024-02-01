import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { addUserAction } from "../services/db/actions/userActions";
import { usersDb } from "../services/db/schemas";
import crypto from "crypto";
import jwt from "jsonwebtoken";

export const registerUserHandler = async (req: Request, res: Response) => {
  const { login, password, confirmpassword } = req.body;
  if (!login && !password && !confirmpassword) {
    return res.status(403).json({ error: "All Fields are required" });
  }
  if (confirmpassword !== password) {
    return res.status(403).json({ error: "Password do not match" });
  }
  try {
    // Check if user already exists
    const existingUser = await usersDb.findOne({ login });

    if (existingUser) {
      return res.status(409).json({ error: "Username already exists" });
    }

    // Hash the password before saving it to the database
    const salt = await bcrypt.genSalt(15);
    const hashedPassword = await bcrypt.hash(password, salt);
    const refreshToken = crypto.randomBytes(64).toString("hex");

    // Create and save the new user
    const newUser = await addUserAction({
      //@ts-ignore
      login,
      password: hashedPassword,
      refreshToken,
    });

    return res.status(200).json(newUser);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

export const loginUserHandler = async (req: Request, res: Response) => {
  try {
    const { login, password } = req.body;

    const user = await usersDb.findOne({ login });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign(
      { login: user.login },
      //@ts-ignore
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.json({ message: "Logged in successfully", token });
  } catch (e: any) {
    console.log(e.message);
  }
};

export const logoutUserHandler = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  const user = await usersDb.findOne({ refreshToken });
  if (!user) {
    return res.status(400).json({ message: "Invalid refresh token" });
  }

  user.refreshToken = null;
  res.json({ message: "User logged out successfully" });
};

export const refreshTokenHandler = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  const user = await usersDb.findOne({ refreshToken });
  if (!user) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }

  const newToken = jwt.sign(
    { login: user.login },
    //@ts-ignore
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  res.json({ message: "New access token generated", token: newToken });
};
