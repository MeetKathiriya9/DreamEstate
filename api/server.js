import express from 'express'
import router from './Router/Route.js';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import Userrouter from './Router/user.js';
import cookieParser from 'cookie-parser';
import Listingrouter from './Router/ListingRoute.js';
// import path from 'path';
dotenv.config();

mongoose.connect(process.env.DB_URL).then(()=>{
    console.log("Database Connected");
}).catch((err)=>{
    console.log(err);
});

// const __dirname = path.resolve();

const app = express();

app.use(cookieParser())

app.use(express.json())

//Routes
app.use("/api/auth",router)
app.use("/api/user",Userrouter)
app.use("/api/listing",Listingrouter)


// app.use(express.static(path.join(__dirname,"/client/dist")));

// app.get('*',(req,res) => {
//     res.sendFile(path.join(__dirname,'client', 'dist', 'index.html'));
// })


app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})

app.listen(6000,() => {
    console.log('3000 is running')
})

    // "build": "npm install && npm install --prefix client && npm run build --prefix client"
