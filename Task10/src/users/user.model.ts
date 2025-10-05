import "../db/mongoose"; // ensure connection utilities available
import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["STUDENT", "ADMIN", "COACH"],
      default: "STUDENT",
    },
  },
  { timestamps: true }
);

export const UserModel = model("User", userSchema);

export type IUser = typeof UserModel extends mongoose.Model<infer D> ? D : any;
