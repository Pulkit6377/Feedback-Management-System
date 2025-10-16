import mongoose from "mongoose";
import 'dotenv';

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MongoDB_URL)
        console.log("DataBase Connected");
        
    } catch (error) {
        console.log(error);
        
    }
}

export default connectDB ;