import express from 'express'
import { deleteUser, getUser, getUserListing, signoutUser, updateuser } from '../Controller/user.controller.js';
import { verifyToken } from '../Util/VerifyUser.js';

const Userrouter = express.Router();

Userrouter.put("/update/:id",verifyToken,updateuser)
Userrouter.delete("/signout/:id",verifyToken,signoutUser)
Userrouter.delete("/delete/:id",verifyToken,deleteUser)
Userrouter.get("/listing/:id",verifyToken,getUserListing)
Userrouter.get("/:id",verifyToken,getUser)


export default Userrouter;