import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateToken = (user) => jwt.sign({id:user._id},process.env.JWT_SECRET || 'secret',
    {expiresIn: process.env.JWT_EXPIRES_IN || '7d'}
)
export const register = async (req,res,next) => { 
    try{
        const {name,email,password} = req.body;
        if(!name||!email || !password) return res.status(400).json({message:'All fields are required'});
        const exists = await User.findOne({email});
        if(exists) return res.status(400).json({message: "User exists"});
        const user = await User.create({name,email,password});
        res.status(201).json({token: generateToken(user),user:{id:user._id,name:user.name,email:user.email,isAdmin:user.isAdmin}})

    } catch(err){ console.error("Register error : ",err); 
        res.status(500).json({message: "Server error"});
 
    }
}
export const login = async(req,res,next) => {
    try{
      const{email,password} = req.body;
      const user= await User.findOne({email});
      if(!User || !(await user.matchPassword(password))) return res.status(400).json({message:"Invalid Credentials"})
       res.json({token:generateToken(user),user : {id:user._id,name:user.name,email:user.email,isAdmin:user.isAdmin}})
    }catch(err){ next(err);
      
    }
    
}