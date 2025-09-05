import { Request, Response, NextFunction } from "express";
import { success } from "zod";

export default (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  } else if (process.env.NODE_ENV === "production") {
    // Operational, trusted error
    if (err.isOperational) {
      res.status(err.statusCode).json({
        success: false,
        status: err.status,
        message: err.message,
      });
      // Unknown error
    } else {
      console.error("ERROR 💥", err);
      res.status(500).json({
        status: "error",
        message: "Something went very wrong!",
      });
    }
  }
};
