import User from "../Model/auth.model.js";
import bcrypt from 'bcrypt'
import { errorHandler } from "../Util/error.js";
import Jwt from "jsonwebtoken";

export const authcontroller = async (req, res, next) => {
    const { username, email, password } = req.body;

    const hashpassword = await bcrypt.hash(password, 10)

    try {

        const userdata = await User.create({
            username, email, password: hashpassword
        })

        res.status(400).json("inserted...")
    }
    catch (err) {
        return next(errorHandler(550, "Data Already Exist..!"))
    }

}


export const loginauthcontroller = async (req, res, next) => {

    const { email, password } = req.body;

    try {

        const ValidateUser = await User.findOne({ email })

        if (!ValidateUser) {
            return next(errorHandler(404, "User Not Found..!"))
        }

        const ValidatePassword = await bcrypt.compare(password, ValidateUser.password)

        if (!ValidatePassword) {
            return next(errorHandler(401, "Wrong Credentials..!"))
        }

        const token = Jwt.sign({ _id: ValidateUser._id }, process.env.SECRET_KEY)

        res.cookie("access_token", token, { httpOnly: true }).status(200).json(ValidateUser)

        // res.status(400).json("inserted...")
    }
    catch (err) {
        return next(errorHandler(550, "Data Already Exist..!"))
    }

}


export const google = async (req,res) => {
    try {
        const user = await User.findOne({ email: req.body.email })

        if (user) {
            const token = Jwt.sign({ id: user._id }, process.env.SECRET_KEY)
            const { password: pass, ...rest } = user._doc;

            return res.cookie("access_token", token, { httpOnly: true }).status(200).json(rest)
        }
        else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcrypt.hashSync(generatedPassword, 10);

            const newUser = new User({
                username: req.body.name,
                email: req.body.email,
                password: hashedPassword,
                avatar: req.body.photo
            })

            await newUser.save();

            const token = Jwt.sign({ id: newUser._id }, process.env.SECRET_KEY);
            const { password: pass, ...rest } = newUser._doc;

            res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);

        }
    }
    catch (error) {
        console.log(error);
    }
}