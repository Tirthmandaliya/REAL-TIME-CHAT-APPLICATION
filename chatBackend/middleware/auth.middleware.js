import jwt from "jsonwebtoken"
import User from "../models/User.model.js"
import dotenv from "dotenv";

dotenv.config();

export const protectRotue = async (req,res,next) => {

    try {
        const token = req.cookies.jwt || req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({message:"Unauthorized-No token provided"});
        }

        const decode = jwt.verify(token,process.env.SECRET_KEY);
        console.log(decode);
        if(!decode){
            return res.status(401).json({mesage:"Unauthorized-No token provided"});
        }

        const user = await User.findById(decode.userId).select("-password");
        console.log(user);
        if (!user) {
            return res.status(404).json({message:"User not found"});
        }
        req.user = user
        next();

    } catch (error) {
        console.log("Error in protected middleware",error?.mesage || error);
        return res.status(500).json({message:"Internal server error"});
    }
};