import jwt from 'jsonwebtoken'
import 'dotenv'

const authMiddleware = async(req,res,next) => {

    const {token} = req.headers;
    if(!token){
       return res.json({success:false,message:"Not Authorised Login Again"})
    }

    try{
        const token_decode = jwt.verify(token,process.env.JWT_SECRET)
        req.user = { _id: token_decode.id, role:token_decode.role};

        next();
    }
    catch(error){
        console.log(error);
       return res.json({success:false,message:"Error"})
    }

}

export default authMiddleware;