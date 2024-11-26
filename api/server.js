import express from 'express'
import router from './Router/Route.js';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import Userrouter from './Router/user.js';
import cookieParser from 'cookie-parser';
import Listingrouter from './Router/ListingRoute.js';
<<<<<<< HEAD
// import path from 'path';
=======
 
>>>>>>> 0371879e2637e2adb5832965f4d369d36a296579
dotenv.config();

mongoose.connect(process.env.DB_URL).then(()=>{
    console.log("Database Connected");
}).catch((err)=>{
    console.log(err);
});

<<<<<<< HEAD
// const __dirname = path.resolve();
=======
>>>>>>> 0371879e2637e2adb5832965f4d369d36a296579

const app = express();

app.use(cookieParser())

app.use(express.json())

//Routes
app.use("/api/auth",router)
app.use("/api/user",Userrouter)
app.use("/api/listing",Listingrouter)


<<<<<<< HEAD
// app.use(express.static(path.join(__dirname,"/client/dist")));

// app.get('*',(req,res) => {
//     res.sendFile(path.join(__dirname,'client', 'dist', 'index.html'));
// })


=======
>>>>>>> 0371879e2637e2adb5832965f4d369d36a296579
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})

<<<<<<< HEAD
app.listen(6000,() => {
    console.log('3000 is running')
})

    // "build": "npm install && npm install --prefix client && npm run build --prefix client"
=======
app.listen(5000,() => {
    console.log('5000 is running')
})
>>>>>>> 0371879e2637e2adb5832965f4d369d36a296579
