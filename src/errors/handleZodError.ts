import { ZodError, ZodIssue } from 'zod';
import { IGenericErrorResponse } from '../interfaces/common';
import { IGenericErrorMessage } from '../interfaces/error';

const handleZodError = (error: ZodError): IGenericErrorResponse => {
  const errors = error.issues.map((issue: ZodIssue): IGenericErrorMessage => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });
  const statusCode = 400;
  //   console.log(error.issues.map(issue => issue.path));
  return {
    statusCode,
    message: 'validation Error',
    errorMessages: errors,
  };
};

export default handleZodError;
