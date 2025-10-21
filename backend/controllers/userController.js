import User from '../models/userModel.js'
import bcrypt, { genSalt } from 'bcrypt'
import jwt from 'jsonwebtoken'
import validator from 'validator'


const loginUser = async(req,res) =>{
    const {email,password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            res.json({success:false,message:"User Not registered"})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            res.json({success:false,message:"Please enter valid login credentials"})
        }
        const token = createToken(user);
        res.json({success:true,token})
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

const createToken = (user) => {
    return jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET)
}

const registerUser = async(req,res) => {
    const {name,email,password} = req.body;
    try {
        const userExist = await User.findOne({email})
        if(userExist){
           return res.json({success:false,message:"User already Exists"})
        }

        //validating email and strong password 
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please Enter Valid Email"})
        }

        if(password.length<6){
            return res.json({success:false,message:"Password must atleast have 8 characters"})
        }

        // hasing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new User({
            name:name,
            email:email,
            password:hashedPassword
        })

        const user = await newUser.save();
        const token  = createToken(user);
        return res.json({success:true,token})
    
    } catch (error) {        
        console.log(error);
        return res.json({success:false,message:"Error"})
    }
}

export {loginUser ,registerUser};