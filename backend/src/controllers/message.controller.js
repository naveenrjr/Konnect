import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getAllUsers = async(req,res) =>{
    try{
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id:{$ne:loggedInUserId}}).select("-password");
        res.status(200).json(filteredUsers);
    }catch(err){
        console.log("error in getting all users",err.message);
        res.status(500).json({message:"Internal server error while fetching users"});
    }
}

export const getMessages = async(req,res)=>{
    try {
        const {id:userToChatId} = req.params
        const senderId = req.user._id;
        const messages = await Message.find({
            $or:[
                {senderId:senderId,receiverId:userToChatId},
                {senderId:userToChatId,receiverId:senderId}
            ]
        })
        res.status(200).json(messages);
    } catch (error) {
        console.log("erorr in getting messages",err.message)
        res.status(500).json({message:"Internal server error"})
    }
}