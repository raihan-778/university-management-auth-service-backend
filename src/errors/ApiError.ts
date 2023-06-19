class ApiError extends Error {
  // this is a custom error handler.we can use nextfunction as a global error handler which by default handeled by express application.
  statusCode: number;

  constructor(statusCode: number, message: string | undefined, stack = '') {
    super(message);
    this.statusCode = statusCode;
    if (stack) {
      this.stack = stack;
    }
    Error.captureStackTrace(this, this.constructor);
  }
}
export default ApiError;
