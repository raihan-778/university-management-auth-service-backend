import { ErrorRequestHandler } from 'express'
import config from '../../config'
import ApiError from '../../errors/ApiError'
import handleValidationError from '../../errors/handleValidationError'
import { IGenericErrorMessage } from '../../interfaces/error'

const globalErrorHandler: ErrorRequestHandler = (
  // if any request handler has first parameter as err it will be a global error handeler of express, which can from ErrorRequestHandler
  error,
  req,
  res,
  next
) => {
  let statusCode = 500
  let message = 'Something went wrong!!'
  let errorMessages: IGenericErrorMessage[] = []

  if (error.name === 'ValidatorError') {
    const simplifiedError = handleValidationError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode
    message = error?.message
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  } else if (error instanceof Error) {
    message = error?.message
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env != 'production' ? error?.stack : undefined,
  })

  next(error)
}
export default globalErrorHandler
