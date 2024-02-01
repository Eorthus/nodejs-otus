import passport from "passport";
import { usersDb } from "../db/schemas";
import bcrypt from "bcrypt";
import jwt from "passport-jwt";

const JwtStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

export const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
  issuer: "accounts.examplesoft.com",
  audience: "yoursite.net",
};

passport.use(
    //@ts-ignore
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {

      const user = await usersDb.findOne({ login: jwt_payload.login });

      if (user) {
        // Compare the provided password with the
        // hashed password in the database
        const passwordsMatch = await bcrypt.compare(
          jwt_payload.password,
          user.password
        );

        // // If the passwords match, return the user object
        if (passwordsMatch) {
          return done(null, user);
        } else {
          // If the passwords don't match, return an error
          return done(null, false, { error: "Incorrect password" });
        }
      } else {
        return done(null, false);
        // or you could create a new account
      }
    } catch {
      return done(null, false);
      // or you could create a new account
    }
  })
);
