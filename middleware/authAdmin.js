import jwt from 'jsonwebtoken'

export const authAdminMiddleware = async(req,res) =>{
    if(req.user && req.user.role === "admin"){
        next();
    }
    else{
        res.json({success:false,message:"Access Denied.Admins Only"})
    }
}