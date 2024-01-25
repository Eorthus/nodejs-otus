import express from 'express'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import userRouter from './routers/userRouter'
import courseRouter from './routers/courseRouter';
import * as swaggerOptions from './swagger.json';

const app = express()

app.use(express.json())
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerJsdoc(swaggerOptions), { explorer: true })
  );
app.use('/api', userRouter)
app.use('/api', courseRouter)

export default app

