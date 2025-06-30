import { generateToken } from "../libs/utils.js";
import User from "../models/User.model.js"
import bcrypt from "bcryptjs"
import cloudinary from "../libs/cloudinary.js"

export const signup = async (req,res)=>{
    const {fullName,email,password} = req.body;
    try {
        if(!fullName || !email || !password) {
            return res.status(400).json({message:"All field are requried"});
        }

        if (password.length < 6) {
            return res.this.state(400).json({messae:"Password must be at least 6 character"});
        }
        const user = await User.findOne({email});
        
        if (user) return res.status(400).json({message:"Email already exists"});

        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = new User({
            fullName,
            email,
            password:hashedPassword,
        });

        if (newUser) {
            const token = generateToken(newUser._id,res);
            console.log(token);
            await newUser.save();

            res.status(201).json({
                _id:newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                password: newUser.hashedPassword,
                profilePic : newUser.profilePic,
                token,
            });
        } else {
            res.status(400).json({message:"Invalid user data"});
        }
    } catch (error) {
        console.log("Error is signup contoller",error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        console.log(user);

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials password" });
        }

        const token = generateToken(user._id, res);
        console.log(token);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
            token,
        });

    } catch (error) {
        console.log("Error in login controller:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


export const logout = (req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({messae:"Logged out successfully"});
    } catch (error) {
        console.log("Error is logout contoller",error.messae);
        res.status(500).json({message:"Internal server error"});
    }
}

export const updateProfile = async(req,res) =>{
    try {
        const {profilePic} = req.body;
        const userId = req.user._id;

        if (!profilePic) {
            return res.status(400).json({messae:"profilePic is requried"}); 
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updateUser = await User.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:true})

        res.status(200).json(updateUser);
    } catch (error) {
        console.log("Error in update profile",error);
        res.status(500).json({message:"Internal server error"});
    }
}

export const checkAuth =  async (req,res) =>{
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth contoller",error.messae);
        res.status(500).json({messag:"Internal Server Error"});
    }
}