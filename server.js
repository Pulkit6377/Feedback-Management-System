import express from 'express'
import dotenv from 'dotenv'

import { connectDB } from '../../Food-Delievey-App/server/config/db.js'

dotenv.config();

connectDB();

const server = express();

server.use(express.json());

const PORT = process.env.PORT || 5000 ;

server.listen(PORT,'0.0.0.0',()=>{
    console.log(`Server started on http://localhost:${PORT}`);
    
})