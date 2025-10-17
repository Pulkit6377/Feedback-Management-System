import express from 'express'
import dotenv from 'dotenv'

import {connectDB} from './config/db.js'
import feedbackRouter from './routes/feedbackRoute.js';

dotenv.config();

connectDB();

const server = express();

server.use(express.json());

const PORT = process.env.PORT || 5000 ;

server.get("/",(req,res)=>{
    res.send("API Workings")
})

server.use("/api/user",feedbackRouter);

server.listen(PORT,'0.0.0.0',()=>{
    console.log(`Server started on http://localhost:${PORT}`);
    
})