import mongoose from "mongoose";
import { ENV_VARS } from "../utils/envVars.js";

export async function connectDB() {
  try {
    await mongoose.connect(ENV_VARS.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("error in connectDB : ", error);
    process.exit(1);
  }
}
