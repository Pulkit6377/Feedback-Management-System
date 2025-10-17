import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
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

const feedback = mongoose.model("feedback",feedbackSchema)

export default feedback;