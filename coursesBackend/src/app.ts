import express from 'express'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import passport from 'passport'
import session from 'express-session'
import './services/auth/passport'
import userRouter from './routers/userRouter'
import courseRouter from './routers/courseRouter';
import * as swaggerOptions from './swagger.json';
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerJsdoc(swaggerOptions), { explorer: true })
  );
  app.use( 
    session({ 
        secret: "GFGLogin346", 
        resave: false, 
        saveUninitialized: false, 
    }) 
)
app.use(passport.initialize()); 
app.use(passport.session()); 
app.use('/api', userRouter)
app.use('/api', courseRouter)

export default app

