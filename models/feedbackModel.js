import mongoose from "mongoose";
import userModel from "./userModel";

const feedbackSchema = new mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:userModel
        },
        rating:{
            type:Number,
            required:true,
            min:1,
            max:5
        },
        comment:{
            type:String,
            required:true
        }
    },
    {
        timestamps:true
    }

)

const feedbackModel = mongoose.model("feedback",feedbackSchema)

export default feedbackModel;