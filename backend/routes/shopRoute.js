const express = require("express")
const {createEditShop,getMyShop, getShopByCity} = require("../controllers/shop")
const isAuth = require("../middleware/isAuth")
const upload  = require("../middleware/multer")


const shopRouter = express.Router()


shopRouter.post("/create-edit",isAuth,upload.single("image"),createEditShop)
shopRouter.get("/get-my",isAuth,getMyShop)
shopRouter.get("/get-by-city/:city",isAuth,getShopByCity)

module.exports = shopRouter
