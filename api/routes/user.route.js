import express from "express";
import { updateProfile } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/update", updateProfile);
// router.post("/login", login);
// router.post("/logout", logout);

export default router;
