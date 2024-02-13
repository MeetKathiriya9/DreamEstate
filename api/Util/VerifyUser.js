import Jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = (req,res,next) => {
    const token = req.cookies.access_token;
    // console.log(token);

    if(!token){
        return next(errorHandler(401,"unauthorized"))
    }

    Jwt.verify(token,process.env.SECRET_KEY, (err,user) => {
        if(err){
            return next(errorHandler(403,'Forbidden'))
        }

        req.user = user;
        next();
    })
}