import jwt from "jsonwebtoken";
import User from '../models/User.js'

export const protect = async( req,res,next) => {
    let token;
    const auth = req.headers.authorization;
    console.log("Auth header:", req.headers.authorization);
console.log("Extracted token:", token);

    if(auth && auth.startsWith('Bearer')) token = auth.split(' ')[1];
    if(!token) return res.status(401).json({message:"NOTAUTHORIZED ,token missing "})
    try {  
     const decoded= jwt.verify(token,process.env.JWT_SECRET || 'secret');
     req.user = await User.findById(decoded.id).select("-password");
     if(!req.user) return res.status(401).json({message: "User not Found "});
     next();
    }
    catch(err){ 
     res.status(401).json({message:"Not authorized , token failed"})
    }
};

 export const admin = (req,res,next) => {
    if(req.user && req.user.isAdmin) return next();
    res.status(403).json({message:'Admin only'});
 }
 