/**
 * Custom error class for application-specific errors.
 * Includes HTTP status code and an optional error code for better error handling.
 */
export default class AppError extends Error {
  constructor(message, statusCode = 500, code = 'INTERNAL_SERVER_ERROR') {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true;
    
    Error.captureStackTrace(this, this.constructor);
  }
}
