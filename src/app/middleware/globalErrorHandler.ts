import { NextFunction, Request, Response } from 'express'
import config from '../../config'
import { IGenericErrorMessage } from '../../interfaces/error'

const globalErrorHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = 500
  const message = 'Something went wrong!!'
  const errorMessages: IGenericErrorMessage[] = []

  //   if (err.name === 'ValidatorError') {
  //     const simplifiedError = handleValidationError(err)
  //   }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env != 'production' ? err?.stack : undefined,
  })

  next(err)
}
export default globalErrorHandler
