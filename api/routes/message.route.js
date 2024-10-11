import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import {sendMessage, getConversation} from '../controllers/message.controller.js'

const router = express.Router();

router.use(protectRoute);

router.post("/send", sendMessage);
router.post("/conversation/:userId", getConversation);

export default router;
