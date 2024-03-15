import { Router } from "express";
import {  registerUserHandler, loginUserHandler, logoutUserHandler, refreshTokenHandler} from "../controllers/authController";

const authRouter = Router()

authRouter.post('/auth/register', registerUserHandler)
authRouter.post('/auth/login',  loginUserHandler)
authRouter.post('/auth/logout', logoutUserHandler)
authRouter.post('/auth/token', refreshTokenHandler);

export default authRouter

