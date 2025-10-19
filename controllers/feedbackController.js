import feedbackModel from "../models/feedbackModel.js";

// user feedback control
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

export const getMyFeedback = async(req,res) =>{
    try {
        const feedback = await feedbackModel.find({user:req.user._id})
        if(!feedback){
            return res.json({success:false,message:"Feedback Not Found"})
        }
        return res.json({success:true,feedback})
    } catch (error) {
        console.log(error);
        return res.json({success:true,message:"Error"})
    }
}

export const updateMyFeedback = async(req,res) =>{
    try {
        const feedback = await feedbackModel.findById(req.params.id);
        if(!feedback){
            return res.json({success:false,message:"Feedback Not found"})
        }

        //only user can update the feedback
        if(feedback.user.toString() !== req.user._id.toString() && req.user.role !== "admin"){
            return res.json({success:false,message:"Not authorized to update this feedback"})
        }
        feedback.comment = req.body.comment || feedback.comment;
        await feedback.save();
        return res.json({success:true,message:"Feedback updated Successfully"})
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:"Error"})
    }
}

// admin feedback control
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