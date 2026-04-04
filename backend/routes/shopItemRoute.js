const express = require("express")
const {addItem, editItem, getItemById, deleteItem,getItemByCity, getItemByShop, searchItems} = require("../controllers/shopItem")
const isAuth = require("../middleware/isAuth")
const upload  = require("../middleware/multer")


const itemRouter = express.Router()


itemRouter.post("/add-item",isAuth,upload.single("image"),addItem)
itemRouter.post("/edit-item/:itemId",isAuth,upload.single("image"),editItem)
itemRouter.get("/get-by-id/:itemId",isAuth,getItemById)
itemRouter.get("/delete/:itemId",isAuth,deleteItem)
itemRouter.get("/get-by-city/:city",isAuth,getItemByCity)
itemRouter.get("/get-by-shop/:shopId",isAuth,getItemByShop)
itemRouter.get("/search-items",isAuth,searchItems)

module.exports = itemRouter