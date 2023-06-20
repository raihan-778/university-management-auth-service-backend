import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middleware/globalErrorHandler';

import { UserRoutes } from './app/modules/user/user.router';

import { generateFacultyId } from './app/modules/user/user.utils';
import routes from './app/routes';

const app: Application = express();

app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//application routes
// app.use('/api/v1', UserRoutes);
// app.use('/api/v1', AcademicsemesterRoutes);
app.use('/api/v1', routes);
app.post('/create-user', UserRoutes);
// app.get('/:id', AcademicSemesterRoutes);
// app.get('/', AcademicSemesterRoutes);

//api for testing
app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  res.send('Our University Management app is running perfectly ');
  // Promise.reject(new Error('Unhandeled promise rejection'))
  // throw new Error('ore Baba Error')
  // next('Ore baba Error')
  next();
});
// const academicSemester = {
//   code: '01',
//   year: '2025',
// };
// const testId = generateStudentId(academicSemester);
// console.log(testId);
//global error handler
app.use(globalErrorHandler);

//handle not found
app.use((req, res, next) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [{ path: req.originalUrl, message: 'Api not exist' }],
  });
  next();
});

const testId = generateFacultyId();
console.log(testId);
// console.log(process.env)

export default app;
