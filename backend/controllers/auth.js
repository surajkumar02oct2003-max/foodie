const User = require("../models/userModel")
const bcrypt = require("bcryptjs")
const genToken = require("../utils/token")
const sendOtpMail = require("../utils/mail")


//sign up
const signUp = async(req , res)=>{
    try{
        const {fullName, email, password, mobile, role} = req.body
         user = await User.findOne({email})
        if(user){
            return res.status(400).json({
                message:"User already exist"
            })
        }
        if(password.length<6){
            return res.status(400).json({
                message:"Password must be 6 charcter"
            })
        }
        if(mobile.length<10){
            return res.status(400).json({
                message:"mobile must be 10 of digit"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        // creating entry in db
        user = await User.create({
            fullName, email, password:hashedPassword, mobile, role
        })

        //genreting token
        const token = await genToken(user._id)
        res.cookie("token", token, {
            secure:false,
            sameSite:"strict",
            maxAge:7*24*60*60*1000,
            httpOnly:true
        })

        return res.status(201).json(user)


    }
    catch(error){
        return res.status(500).json({
            message:"sign up error"
        })

    }
}


//sign in 
const signIn = async(req , res)=>{
    try{
        const { email, password} = req.body
         user = await User.findOne({email})
        if(!user){
            return res.status(400).json({
                message:"User does not exist"
            })
        }
        
        const isMatched = await bcrypt.compare(password, user.password)
        if(!isMatched){
             return res.status(400).json({
                message:"password does not matched"
            })
        }

        //genreting token or sign in
        const token = await genToken(user._id)
        res.cookie("token", token, {
            secure:false,
            sameSite:"strict",
            maxAge:7*24*60*60*1000,
            httpOnly:true
        })

        return res.status(200).json(user)


    }
    catch(error){
        return res.status(500).json({
            message:"sign in  error"
        })

    }
}


//sign out
const signOut = async(req, res)=>{
    try{
        res.clearCookie("token")
        return res.status(200).json({
            message:"log out successfully"
        })
    }
    catch(error){
        return res.status(500).json({
            message:"logout error"
        })
    }
}


//send otp
const sendOtp = async(req,res)=>{
    try{
        const {email} = req.body
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"User  does  not  exist."})
        }
        const otp = Math.floor(1000 + Math.random() * 9000).toString()

        //otp stroing in db
        user.resetOtp = otp

        //expires otp
        user.otpExpires = Date.now()+5*60*1000

        // verify otf
        user.isOtpVerified = false

        await user.save()

        await sendOtpMail(email, otp)
        return res.status(200).json({message:"otp sent successfully"})

    }
    catch(err){
        console.log("yhi code fata hai:",err)
        return res.status(500).json({ 
         message:"otp does not send"
        })
    }
}


//verify otp
const verifyOtp = async(req,res)=>{
    try{
        const {email,otp} = req.body
        const user = await User.findOne({email})
        if(!user || user.resetOtp != otp || user.otpExpires<Date.now()){
            return res.status(400).json({message:"Invalid/expire otp"})
        }

        user.isOtpVerified = true
        user.resetOtp = undefined
        user.otpExpires = undefined

        await user.save()
        return res.status(200).json({message:"user verified successfully"})
    }
    catch(err){
        return res.status(500).json({
            message:"user does not verified"
        })
    }
}

//reset password
const resetPassword = async(req , res)=>{
    try{
        const{email, newPassword} = req.body 
        const user = await User.findOne({email})
        if(!user ||  !user.isOtpVerified){
            return res.status(400).json({message:"Otp verification is required"})
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10)
        user.password = hashedPassword
        user.isOtpVerified = false
        await user.save()
        return res.status(200).json({message:"password reset successfully"})

    }
    catch(err){
        return res.status(500).json({
            message:"password is not able to changed"
        })
    }
}

module.exports = { signUp, signIn, signOut, sendOtp, verifyOtp, resetPassword };