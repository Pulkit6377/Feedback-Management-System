import mongoose from "mongoose";
import 'dotenv';

export const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MongoDB_URL)
        console.log("DataBase Connected");
        
    } catch (error) {
        console.log(error);
        
    }
}

