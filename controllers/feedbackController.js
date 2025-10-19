import feedbackModel from "../models/feedbackModel.js";


export const submitFeedback = async(req,res) =>{
    try {
        const {rating,comment} = req.body;
        const Feedback = await feedbackModel.create({
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
        const feedbacks = await feedbackModel.find().populate("user","name email");
        res.json({success:true,feedback})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export const deleteFeedback = async(req,res) => {
    try {
        const feedback  = await feedbackModel.findByIdAndDelete(req.params.id);
        if(!feedback){
            res.json({success:false,message:"Feedback Not Found"})
        }
        await feedback.deleteOne();
        res.json({success:true,message:"Feedback Deleted"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}