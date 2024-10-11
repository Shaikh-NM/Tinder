import jwt from "jsonwebtoken";
import { ENV_VARS } from "../utils/envVars.js";

export const generateToken = (userId) => {
  return jwt.sign({ userId }, ENV_VARS.JWT_SECRET, {
    expiresIn: "7d",
  });
};
