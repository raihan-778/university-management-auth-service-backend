/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */

import { ZodError } from 'zod';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import handleCastError from '../../errors/handleCastError';
import handleValidationError from '../../errors/handleValidationError';
import handleZodError from '../../errors/handleZodError';
import { IGenericErrorMessage } from '../../interfaces/error';
import { errorLogger } from '../../shared/logger';
import { ErrorRequestHandler } from 'express';

const globalErrorHandler: ErrorRequestHandler = (
  // if any request handler has first parameter as err it will be a global error handeler of express, which can defined "ErrorRequestHandler" as type.After making our globelErrorHandle as "ErrorRequestHandler" we do not need to set req:Request, res:Respons etc from express. If we use this, then we may not get our error from globalErrorHandler pattern.
  error,
  req,
  res,
  next
) => {
  config.env === 'development' && error
    ? console.log(`🚀global error handler~~`, { error })
    : errorLogger.error(`Global error handler`, error);

  let statusCode = 500;
  let message = 'Something went wrong!!';
  let errorMessages: IGenericErrorMessage[] = [];

  if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error?.name === 'CastError') {
    const simplifiedError = handleCastError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  });

  next();
   //here we dot not need to use next() function because after getting response we do not need to call any middleware
};
export default globalErrorHandler;
