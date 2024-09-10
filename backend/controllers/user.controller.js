import User from "../models/user.model.js";

export const getUserSideBar = async (req,res)=>{
    try{
        const loggedInUserId = req.user._id;
        const allUsers = await User.find({_id:{$ne: loggedInUserId}});
        res.status(200).json(allUsers);
    }catch(error){
        console.log(error.message);
        return res.status(500).json({error: "Internal Server Error"});
    }

}