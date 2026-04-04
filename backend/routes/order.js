const express = require("express")
const { placeOrder, getMyOrders, updateorderStatus } = require("../controllers/order")
const isAuth = require("../middleware/isAuth.js")


const orderRouter = express.Router()


orderRouter.post("/place-order",isAuth,placeOrder)
orderRouter.get("/my-order",isAuth,getMyOrders)
orderRouter.post("/update-status/:orderId/:shopId",isAuth,updateorderStatus)

module.exports = orderRouter
