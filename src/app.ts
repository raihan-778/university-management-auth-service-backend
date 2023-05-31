import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import usersRouter from './app/modules/users/users.router'

const app: Application = express()

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//application routes
app.use('/api/v1/users/', usersRouter)

//testing
app.get('/', (req: Request, res: Response) => {
  res.send('Our University Management app is running perfectly ')
})

export default app
