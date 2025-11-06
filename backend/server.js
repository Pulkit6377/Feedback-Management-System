import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import {connectDB} from './config/db.js'
import feedbackRouter from './routes/feedbackRoute.js';
import userRouter from './routes/userRoute.js';

dotenv.config();

connectDB();

const server = express();

server.use(cors({
    origin:"https://feedback-system-red-gamma.vercel.app",
    credentials:true
}))

server.use(express.json());


const PORT = process.env.PORT || 5000 ;

server.get("/",(req,res)=>{
    res.send("API Workings")
})

server.use("/api/user",feedbackRouter);
server.use("/api/user",userRouter)

server.listen(PORT,'0.0.0.0',()=>{
    console.log(`Server started on http://localhost:${PORT}`);
    
})