import { Router } from "express";
import { getUserByIdHandler, getUsersHandler, patchUserHandler, patchUserCourseHandler } from "../controllers/userController";
import passport from "../services/auth/passport";

const userRouter = Router()

userRouter.get('/users',passport.authenticate('jwt', { session: false }), getUsersHandler)
userRouter.get('/users/:id', passport.authenticate('jwt', { session: false }), getUserByIdHandler)
userRouter.patch('/users/:id', passport.authenticate('jwt', { session: false }), patchUserHandler)
userRouter.patch('/users/:id/available-courses',passport.authenticate('jwt', { session: false }), patchUserCourseHandler)

export default userRouter

