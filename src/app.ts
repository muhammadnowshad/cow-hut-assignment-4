import cors from 'cors'
import express, { Application, NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
// import usersRouter from './app/modules/users/users.route'
// import adminsRouter from './app/modules/admin/admin.route'
// import cowsRouter from './app/modules/cows/cows.route'
// import odersRouter from './app/modules/orders/orders.route'
import routes from './app/routes'
import cookieParser from 'cookie-parser'

const app: Application = express()

app.use(cors())
app.use(cookieParser())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1', routes)

// //user api
// app.use('/api/v1/', usersRouter);

// //Admin api
// app.use('/api/v1/admins/', adminsRouter);

// //cows api
// app.use('/api/v1/cows/', cowsRouter);

// //order api
// app.use('/api/v1/orders/', odersRouter);

app.get('/', async (req: Request, res: Response) => {
  res.send('Database Connected Successfully')
})

//global error handler
app.use(globalErrorHandler)

//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  })
  next()
})

export default app
