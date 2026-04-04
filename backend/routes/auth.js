const express = require("express")
const {signUp, signIn, signOut, sendOtp, verifyOtp, resetPassword} = require("../controllers/auth")


const authRouter = express.Router()

authRouter.post("/signup",signUp)
authRouter.post("/signin",signIn)
authRouter.get("/signout",signOut)
authRouter.post("/send-otp",sendOtp)
authRouter.post("/verify-otp",verifyOtp)
authRouter.post("/reset-password",resetPassword)

module.exports = authRouter
