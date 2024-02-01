import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import passport from 'passport'
import './services/auth/passport'
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
    swaggerUi.serve,
    swaggerUi.setup(swaggerJsdoc(swaggerOptions), { explorer: true })
  )
app.use(passport.initialize()); 
// app.use(passport.session()); 
app.use('/api', userRouter)
app.use('/api', courseRouter)
app.use('/api', authRouter)

export default app

