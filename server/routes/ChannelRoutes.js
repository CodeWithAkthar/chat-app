import { Router } from "express";
import { createChannel } from "../controllers/ChannelController.js";
import { verifyToken } from "../middleware/AuthMiddleware.js";

const channelRoutes = Router();

channelRoutes.post("/create-channel", verifyToken, createChannel);
export default channelRoutes;
