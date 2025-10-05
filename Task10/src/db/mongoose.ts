import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });

const MONGO_URL =
  process.env.MONGODB_URL ||
  process.env.DATABASE_URL ||
  "mongodb://localhost:27017/code2career";

export async function connectDB() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
}

export default mongoose;
