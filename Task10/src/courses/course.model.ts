import "../db/mongoose";
import { Schema, model } from "mongoose";

const courseSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, default: null },
    ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    students: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export const CourseModel = model("Course", courseSchema);
