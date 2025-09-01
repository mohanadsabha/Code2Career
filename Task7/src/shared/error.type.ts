import httpStatus = require("./http.status");

class AppError extends Error {
  public statusCode: httpStatus.HttpErrorStatus;
  public status: string;
  public isOperational: boolean;

  constructor(message: string, statusCode: httpStatus.HttpErrorStatus) {
    super();
    this.message = message;
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
