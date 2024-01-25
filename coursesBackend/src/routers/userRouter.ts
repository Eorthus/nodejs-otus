import { Router } from "express";
import { getUserByIdHandler, getUsersHandler, patchUserHandler, patchUserCourseHandler, registerUserHandler ,loginUserHandler, logoutUserHandler } from "../controllers/userController";
import passport from "passport";

const userRouter = Router()

userRouter.get('/users', getUsersHandler)
userRouter.get('/users/:id', getUserByIdHandler)
userRouter.patch('/users/:id', patchUserHandler)
userRouter.patch('/users/:id/available-courses', patchUserCourseHandler)
userRouter.post('/users/register', registerUserHandler)
userRouter.post('/users/login', passport.authenticate("local", { session: false }),  loginUserHandler)
userRouter.post('/users/logout', logoutUserHandler)

export default userRouter

