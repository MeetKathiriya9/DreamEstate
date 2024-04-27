import express from 'express'
import router from './Router/Route.js';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import Userrouter from './Router/user.js';
import cookieParser from 'cookie-parser';
import Listingrouter from './Router/ListingRoute.js';
 
dotenv.config();

mongoose.connect(process.env.DB_URL).then(()=>{
    console.log("Database Connected");
}).catch((err)=>{
    console.log(err);
});


const app = express();

app.use(cookieParser())

app.use(express.json())

//Routes
app.use("/api/auth",router)
app.use("/api/user",Userrouter)
app.use("/api/listing",Listingrouter)


app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})

app.listen(4000,() => {
    console.log('4000 is running')
})