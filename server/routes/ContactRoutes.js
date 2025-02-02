
import {Router} from "express"
import { getAllContacts, getContactsForDMList, searchcontacts } from "../controllers/contactController.js";
import { verifyToken } from "../middleware/AuthMiddleware.js";
const contactRoutes = Router();

contactRoutes.post("/search",verifyToken,searchcontacts)
contactRoutes.get("/get-contacts-for-dm",verifyToken,getContactsForDMList)
contactRoutes.get("/get-all-conatcts",verifyToken,getAllContacts);

export default contactRoutes;