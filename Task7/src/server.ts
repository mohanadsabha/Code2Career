import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import express, { Request, Response, NextFunction } from "express";
import AppError from "./shared/error.type";
import globalErrorHandler from "./shared/error.handler";
import { userRouter } from "./users/user.routes";
import { authRouter } from "./auth/auth.router";

process.on("uncaughtException", (err) => {
  console.log("UNCAUGT EXCEPTION! Shutting down...", err);
  process.exit(1);
});

const app = express();

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);

// Unhandled routes
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Global Error Handeling Middleware
app.use(globalErrorHandler);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! Shutting down...");
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});

export default app;
