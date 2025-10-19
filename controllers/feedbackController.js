import feedback from "../models/feedbackModel.js";

export const submitFeedback = async(req,res) =>{
    try {
        const {rating,comment} = req.body;
        const Feedback = await feedback.create({
            user:req.user._id,
            rating,
            comment})
        res.json({success:true,message:"Feedback Submitted successfully"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export const getAllFeedbacks = async(req,res) => {
    try {
        const feedbacks = await feedback.find().populate("user","name email");
        res.json({success:true,feedback})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}