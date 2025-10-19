import feedbackModel from "../models/feedbackModel.js";


export const submitFeedback = async(req,res) =>{
    try {
        const {rating,comment} = req.body;
        const Feedback = await feedbackModel.create({
            user:req.user._id,
            rating,
            comment})
        return res.json({success:true,message:"Feedback Submitted successfully"})
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:"Error"})
    }
}

export const getAllFeedbacks = async(req,res) => {
    try {
        const feedbacks = await feedbackModel.find().populate("user","name email");
        return res.json({success:true,feedbacks})
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:"Error"})
    }
}

export const deleteFeedback = async(req,res) => {
    try {
        const feedback  = await feedbackModel.findByIdAndDelete(req.params.id);
        if(!feedback){
           return res.json({success:false,message:"Feedback Not Found"})
        }
        await feedback.deleteOne();
        return res.json({success:true,message:"Feedback Deleted"})
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:"Error"})
    }
}