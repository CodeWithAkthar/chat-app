
import {Router} from "express"
import { searchcontacts } from "../controllers/contactController.js";
import { verifyToken } from "../middleware/AuthMiddleware.js";
const contactRoutes = Router();

contactRoutes.post("/search",verifyToken,searchcontacts)

export default contactRoutes;