import jwt from 'jsonwebtoken'

export const authAdminMiddleware = async(req,res,next) =>{
    
    if(req.user.role === "admin"){
        next();
    }
    else{
        res.json({success:false,message:"Access Denied.Admins Only"})
    }
}