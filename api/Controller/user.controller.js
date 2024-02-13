import User from "../Model/auth.model.js"
import Listing from "../Model/listing.model.js"
import { errorHandler } from "../Util/error.js"
import bcrypt from 'bcrypt'

export const updateuser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, "You Can't Access Someone's Account"))
    }

    try {
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10)
        }

        const updateuser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar
            }
        }, { new: true })

        console.log("user...", updateuser);

        const { password, ...rest } = updateuser._doc;
        res.status(200).json(rest)
    }
    catch (error) {
        next(error)
    }
}

export const signoutUser = (req,res,next) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, "You Can't Access Someone's Account"))
    }

    try {
        return res.status(200).clearCookie('access_token').json("User SignOut Successfully")
    } catch (error) {
        return next(errorHandler(500,"Something went wrong while user try to signout"))
    }
}

export const deleteUser = async (req,res,next) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, "You Can't Access Someone's Account"))
    }

    try {

        await User.findByIdAndDelete(req.user.id)

        return res.status(200).clearCookie('access_token').json("User Deleted Successfully")
    } catch (error) {
        return next(errorHandler(500))
    }
}

export const getUserListing = async (req,res,next) => {
    if(req.user.id === req.params.id){
        try {
            const listing = await Listing.find({userRef: req.params.id})
            res.status(200).json(listing)
        } catch (error) {
            next(error)
        }
    }
    else{
        return next(errorHandler(401,"You Need To Be Login First"))
    }
}

export const getUser = async (req,res,next) => {
    try {
        const userdata = await User.findById(req.params.id)

        if(!userdata){
            return next(errorHandler(404,"User Not Found..."))
        }

        const {password : pass , ...rest} = userdata._doc;

        res.status(200).json(rest);

    } catch (error) {
        next(error)
    }
}