import passport from "passport" 
import LocalStrategy  from "passport-local"
import { usersDb } from "../db/schemas";
import bcrypt from "bcrypt"
  
passport.use( 
    new LocalStrategy.Strategy(async (login, password, done) => { 
        try { 
            // Find the user by username in the database 
            const user = await usersDb.findOne({ login }); 
            // If the user does not exist, return an error 
            if (!user) { 
                //@ts-ignore
                return done(null, false, { error: "Incorrect username" }); 
            } 
  
            // Compare the provided password with the  
            // hashed password in the database 
            const passwordsMatch = await bcrypt.compare( 
                password, 
                user.password
            ); 
  
            // If the passwords match, return the user object 
            if (passwordsMatch) { 
                return done(null, user); 
            } else { 
                // If the passwords don't match, return an error 
                //@ts-ignore
                return done(null, false, { error: "Incorrect password" }); 
            } 
        } catch (err) { 
            return done(err); 
        } 
    }) 
); 