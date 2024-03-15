import passport from "passport";
import { usersDb } from "../db/schemas";
import jwt from "passport-jwt";

const JwtStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

export const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

export default passport.use(
    //@ts-ignore
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {

      const user = await usersDb.findOne({ login: jwt_payload.login });
      if (user) {
          return done(null, user);

      } else {
        return done(null, false);
        // or you could create a new account
      }
    } catch {
      return done(null, false);
      // or you could create a new account
    }
  })
)

// export default passport
