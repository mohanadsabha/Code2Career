import { ZodError, ZodType } from "zod";
import AppError from "./error.type";
import { HttpErrorStatus } from "./http.status";

export const zodValidation = <T>(schema: ZodType<T>, payload: T) => {
  try {
    return schema.parse(payload);
  } catch (error) {
    if (error instanceof ZodError) {
      throw new AppError(error.message, HttpErrorStatus.BadRequest);
    }
    throw error;
  }
};
