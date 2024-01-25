import { Request, Response } from "express"
import bcrypt from 'bcrypt'
import { getUsersAction, getUserByIdAction, updateUserAction, updateUserAvailableCoursesAction, addUserAction } from "../services/db/actions/userActions"
import { usersDb } from "../services/db/schemas"

export const getUsersHandler = async (req: Request, res: Response) => {
    try {
        const items = await getUsersAction()

        if (!items) {
            return res.status(404)
        }

        return res.json(items)
    } catch (err) {
        res.status(500).json(err)
    }
}

export const getUserByIdHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({ message: 'invalid id' })
        }

        const user = await getUserByIdAction(id)

        if (!user) {
            return res.status(404)
        }

        return res.json(user)
    } catch (err) {
        res.status(500).json(err)
    }
}

export const patchUserHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({ message: 'invalid id' })
        }

        const item = await updateUserAction(id, req.body)

        if (!item) {
            return res.status(404)
        }

        return res.json(item)
    } catch (err) {
        res.status(500).json(err)
    }
}

export const patchUserCourseHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({ message: 'invalid id' })
        }

        const item = await updateUserAvailableCoursesAction(id, req.body.courseId)

        return res.json(item)
    } catch (err) {
        res.status(500).json(err)
    }
}

export const registerUserHandler = async (req: Request, res: Response) => {
    const { login, password, confirmpassword } = req.body;
    if (!login && !password && !confirmpassword) {
        return res
            .status(403)
            .json({ error: "All Fields are required" });
    }
    if (confirmpassword !== password) {
        return res
            .status(403)
            .json({ error: "Password do not match" });
    }
    try {
        // Check if user already exists 
        const existingUser = await usersDb.findOne({ login });
        if (existingUser) {
            return res
                .status(409)
                .json({ error: "Username already exists" });
        }

        // Hash the password before saving it to the database 
        const salt = await bcrypt.genSalt(15);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create and save the new user 
        //@ts-ignore
        const newUser = await addUserAction({ login, password: hashedPassword });

        return res.status(200).json(newUser)
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}

export const loginUserHandler = async (req: Request, res: Response) => {
    //@ts-ignore
    req.session.name = req.body.login;
    req.session.save();

    return res.status(200)
}

export const logoutUserHandler = async (req: Request, res: Response) => {
    //@ts-ignore
    req.session.destroy();
    return res.status(200)
}
