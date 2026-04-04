const express = require("express")

const getCurrentUser = require("../controllers/allUser")
const isAuth = require("../middleware/isAuth")


const userRouter = express.Router()


userRouter.get("/current",isAuth,getCurrentUser)

module.exports = userRouter
