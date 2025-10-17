import feedback from "../models/feedbackModel.js";

export const submitFeedback = async(req,res) =>{
    try {
        const {name,email,rating,comment} = req.body;
        const Feedback = await feedback.create({name,email,rating,comment})
        res.json({success:true,message:"Feedback Submitted successfully"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}