import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import { UserRoutes } from './app/modules/user/user.router';
import router from './app/routes';

const app: Application = express();

app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//application routes
// app.use('/api/v1', UserRoutes);
// app.use('/api/v1', AcademicSemisterRoutes);
app.use('/api/v1', router);
app.post('/create-user', UserRoutes);

//api for testing
app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  res.send('Our University Management app is running perfectly ');
  // Promise.reject(new Error('Unhandeled promise rejection'))
  // throw new Error('ore Baba Error')
  // next('Ore baba Error')
  next();
});

//global error handler
app.use(globalErrorHandler);

// console.log(process.env)

export default app;
