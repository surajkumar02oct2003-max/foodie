const uploadOnCloudinary = require("../utils/cloudinary.js")
const Shop = require("../models/shopModel")

// create shop
const createEditShop = async (req, res) => {
    try {
        const { name, city, state, address } = req.body
        let image;
        if (req.file) {
            // console.log('file ye rhi',req.file)
            image = await uploadOnCloudinary(req.file.path)
        }

        let shop = await Shop.findOne({ owner: req.userId })

        if (!shop) {
            //creation of shop
            shop = await Shop.create({
                name, city, state, address, image, owner: req.userId
            })

        } else {
            //edit of shop
            shop = await Shop.findByIdAndUpdate(shop._id, {
                name, city, state, address, image: image || shop.image, owner: req.userId
            }, { new: true })
        }

        await shop.populate("owner items")
        return res.status(201).json(shop)
    }
    catch (error) {
        // return res.status(500).json({ message: `create shop error ${error}` })
        console.log("SHOP CREATE ERROR:", error);
        return res.status(500).json({ message: `create shop error ${error.message}` });
    }
}

//my shop
const getMyShop = async (req, res) => {
    try {
        const shop = await Shop.findOne({ owner: req.userId }).populate("owner items")
        if (!shop) {
            return null
        }
        return res.status(200).json(shop)
    }
    catch (error) {
        return res.status(500).json({ message: `get my shop error ${error}` })
    }
}

//all the shop near by in our cities
const getShopByCity = async(req , res)=>{
    try{
        const {city} = req.params 
        const shops = await Shop.find({
            city:{$regex:new RegExp(`^${city}$`,"i")}
        }).populate("items")
        if(!shops){
            return res.status(404).json({message:"Shop is not found"})
        }
        return res.status(200).json(shops)
    }
    catch(error){
        console.log("GET SHOP BY CITY ERROR:", error);
    return res.status(500).json({ message: "Server error" });
    }
}

module.exports = { createEditShop, getMyShop , getShopByCity}