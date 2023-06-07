import cors from 'cors'
import express, { Application } from 'express'
import globalErrorHandler from './app/middleware/globalErrorHandler'
import { UserRoutes } from './app/modules/user/user.router'

const app: Application = express()

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//application routes
app.use('/api/v1/users', UserRoutes)
app.post('/create-user', UserRoutes)

//testing
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   // res.send('Our University Management app is running perfectly ')
//   // Promise.reject(new Error('Unhandeled promise rejection'))
//   throw new Error('ore Baba Error')
//   // next('Ore baba Error')
// })

//global error handler
app.use(globalErrorHandler)

// console.log(process.env)

export default app
