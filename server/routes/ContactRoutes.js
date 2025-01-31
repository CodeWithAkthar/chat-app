
import {Router} from "express"
import { getContactsForDMList, searchcontacts } from "../controllers/contactController.js";
import { verifyToken } from "../middleware/AuthMiddleware.js";
const contactRoutes = Router();

contactRoutes.post("/search",verifyToken,searchcontacts)
contactRoutes.get("/get-contacts-for-dm",verifyToken,getContactsForDMList)

export default contactRoutes;