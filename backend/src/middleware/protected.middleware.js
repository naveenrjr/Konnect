import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectedRoute = async (req,res,next)=>{
    try{
        const token = req.cookies.token;

        if(!token){
            return res.status(401).json({message:"Unauthorized-Invalid Token provided! No permission "})
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        if(!decoded){
            return res.status(401).json({message:"Unauthorized access"})
        }
        const user = await User.findById(decoded.userId).select("-password");
        if(!user){
            return res.status(404).json({message:"User Not Found"})
        }
        req.user = user;

        next();

    }catch(err){
        console.error("server error while verifying jwt",err.message)
        res.status(500).json({message:"internal server error"});
    }
}