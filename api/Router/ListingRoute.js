import express from "express";
import { createListing, deleteListing, updateListing , getEditListing, getListings} from "../Controller/list.controller.js";
import { verifyToken } from "../Util/VerifyUser.js";

const Listingrouter = express.Router();

Listingrouter.post('/create', verifyToken,createListing)
Listingrouter.delete('/delete/:id', verifyToken,deleteListing)
Listingrouter.put('/update/:id',updateListing)
Listingrouter.get("/get/:id",getEditListing)
Listingrouter.get("/get",getListings)

export default Listingrouter;
