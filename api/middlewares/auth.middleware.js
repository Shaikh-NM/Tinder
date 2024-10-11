import jwt from "jsonwebtoken";
import { ENV_VARS } from "../utils/envVars.js";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: "Unauthorized - No Token Found" });
    }

    const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);
    if (!decoded) {
      return res
        .status(400)
        .json({ success: false, message: "Unauthorized - Invalid Token" });
    }

    const currentUser = await User.findById(decoded.userId);
    req.user = currentUser;
    //   {
    //   userId: '67086ca9bb9aa508de8c2158',
    //   iat: 1728605353,
    //   exp: 1729210153
    // }
    next();
  } catch (error) {
    console.error("error in protect route : ", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
