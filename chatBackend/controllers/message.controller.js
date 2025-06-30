import User from "../models/User.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../libs/cloudinary.js";
import { getReciverSocketId, io } from "../libs/socket.js";

export const getUserForSidebar = async(req,res)=> {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id: {$ne:loggedInUserId}}).select("-password");
        console.log(filteredUsers);
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error in getUserForSidebar",error);
        res.status(500).json({message:"Internal server error"});
    }
};

export const getMessages = async (req,res) => {
    try {
        const { id: userChatId } = req.params;
        const myId = req.user._id;

        const message = await Message.find({
            $or:[
                {senderId:myId, receiverId:userChatId},
                {senderId:userChatId, receiverId:myId},
            ]
        });

        res.status(200).json(message);
    } catch (error) {
        console.log("Error in getMessages controller:",error.message);
        res.status(500).json({error:"Internal server error"});
    }
};

export const sendMessage = async (req,res) => {
    try {
        const { text, image} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._id;

        let imageUrl="";
        if (image) {
            const uploadResponce = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponce.secure_url;
        }

        const newMessage = new Message ({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });

        await newMessage.save();
        // console.log("Text:", text, "Image:", image, "ReceiverId:", receiverId);

        const receriverSocketId = getReciverSocketId(receiverId);
        if( receriverSocketId ) {
            io.to(receriverSocketId).emit("newMessage", newMessage);
        }

        //todo: realtime functionality goes here => socket.io 

        res.status(201).json(newMessage); 
    } catch (error) {
        console.log("Error in sendMessage controller: ",error.message);
        res.status(500).json({error:"Internal server error"});
    }
};