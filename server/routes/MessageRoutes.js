import {Router} from "express"
import { getMessages } from "../controllers/MessageController.js";
import { verifyToken } from "../middleware/AuthMiddleware.js";


const messageRoutes = Router();

messageRoutes.post("/get-messages",verifyToken,getMessages)

export default messageRoutes;
