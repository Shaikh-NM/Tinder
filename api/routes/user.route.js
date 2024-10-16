import express from "express";
import { updateProfile } from "../controllers/user.controller.js";

const router = express.Router();

router.put("/update", updateProfile);
// router.post("/login", login);
// router.post("/logout", logout);

export default router;
