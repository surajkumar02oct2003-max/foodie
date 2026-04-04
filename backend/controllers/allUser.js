const User = require("../models/userModel.js")


const getCurrentUser = async(req, res)=>{
    try{
        const userId = req.userId
        if(!userId){
            return res.status(400).json({message:"userId is not find"})
        }
        const user = await User.findById(userId)
        if(!user){
            return res.status(400).json({message:"User is not found"})
        }
        return res.status(200).json({user})
    }
    catch(error){
        return res.status(500).json({message:  `get current user error ${error}`})
    }
}

module.exports = getCurrentUser