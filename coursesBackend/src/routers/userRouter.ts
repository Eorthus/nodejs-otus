import { Router } from "express";
import { getUserByIdHandler, getUsersHandler, patchUserHandler, patchUserCourseHandler } from "../controllers/userController";

const userRouter = Router()

userRouter.get('/users', getUsersHandler)
userRouter.get('/users/:id', getUserByIdHandler)
userRouter.patch('/users/:id', patchUserHandler)
userRouter.patch('/users/:id/available-courses', patchUserCourseHandler)

export default userRouter

