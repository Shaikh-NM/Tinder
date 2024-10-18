import express from "express";
import { updateProfile } from "../controllers/user.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.put("/update", protectRoute, updateProfile);
// router.post("/login", login);
// router.post("/logout", logout);

export default router;
