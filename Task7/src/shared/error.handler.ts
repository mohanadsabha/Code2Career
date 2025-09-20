import { Request, Response, NextFunction } from "express";
import AppError from "./error.type";

export default (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    if (process.env.NODE_ENV === "development") {
      res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
      });
    } else if (process.env.NODE_ENV === "production") {
      res.status(err.statusCode).json({
        success: false,
        status: err.status,
        message: err.message,
      });
    }
  } else {
    console.error("ERROR 💥", err);
    res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
    });
  }
};
