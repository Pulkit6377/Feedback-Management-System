import User from '../models/userModel.js'
import bcrypt, { genSalt } from 'bcrypt'
import jwt from 'jsonwebtoken'
import validator from 'validator'


const loginUser = async(req,res) =>{
    const {email,password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
          return res.json({success:false,message:"User Not registered"})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
           return res.json({success:false,message:"Please enter valid login credentials"})
        }
        const token = createToken(user);
        return res.json({success:true,token,user:{role:user.role,name:user.name,email:user.email,_id:user._id}})
    }
    catch(error){
        console.log(error);
       return res.json({success:false,message:"Error"})
    }
}

const createToken = (user) => {
    return jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET)
}

const registerUser = async(req,res) => {
    const {name,email,password,role,adminKey} = req.body;
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

        let finalRole = 'user';
        if(role === 'admin'){
            if(adminKey&&adminKey === process.env.ADMIN_KEY){
                finalRole = 'admin'
            }
            else{
                return res.json({success:false,message:"Invalid Admin Key"})
            }
        }

        const newUser = new User({
            name:name,
            email:email,
            password:hashedPassword,
            role:finalRole
        })

        const user = await newUser.save();
        const token  = createToken(user);
        return res.json({success:true,token,
            user: {
            _id: user._id,
            role: user.role,
             name: user.name,
            email: user.email,
            }
})
    
    } catch (error) {        
        console.log(error);
        return res.json({success:false,message:"Error"})
    }
}

export {loginUser ,registerUser};