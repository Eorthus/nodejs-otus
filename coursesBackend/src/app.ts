import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import swaggerUi from 'swagger-ui-express'
import passport from './services/auth/passport'
import userRouter from './routers/userRouter'
import courseRouter from './routers/courseRouter';
import authRouter from './routers/authRouter';
import * as swaggerOptions from './swagger.json';
import cors from 'cors'


const app = express()

app.use(cors())
app.use(express.json())
app.use(
    "/api-docs",
    swaggerUi.serveFiles(swaggerOptions), swaggerUi.setup(swaggerOptions)
  )
app.use(passport.initialize()); 
app.use('/api', userRouter)
app.use('/api', courseRouter)
app.use('/api', authRouter)

export default app

