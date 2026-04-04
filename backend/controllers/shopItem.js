const uploadOnCloudinary = require("../utils/cloudinary")
const Shop = require("../models/shopModel")
const ShopItem = require("../models/temp")


//add item
const addItem = async (req, res) => {
    try {
        const { name, category, foodType, price } = req.body
        let image;
        if (req.file) {
            image = await uploadOnCloudinary(req.file.path)
        }
        const shop = await Shop.findOne({ owner: req.userId })
        if (!shop) {
            return res.status(400).json({ message: "Shop is not found" })
        }
        const item = await ShopItem.create({
            name, category, foodType, price, image, shop: shop._id
        })

        shop.items.push(item._id)
        await shop.save()
        await shop.populate("owner").populate({
            path: "items",
            options: { sort: { updatedAt: -1 } } // to sort taki edit item recent wala upr aye
        })
        return res.status(201).json(shop)

    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ message: "add item error" })
    }
}

//edit item
const editItem = async (req, res) => {
    try {
        const itemId = req.params.itemId
        const { name, category, foodType, price } = req.body
        let image;
        if (req.file) {
            image = await uploadOnCloudinary(req.file.path)
        }

        const item = await ShopItem.findByIdAndUpdate(itemId, {
            name, category, foodType, price, image
        }, { new: true })

        if (!item) {
            res.status(400).json({ message: "Item is not found" })
        }

        const shop = await Shop.findOne({ owner: req.userId }).populate({
            path: "items",
            options: { sort: { updatedAt: -1 } } // to sort taki edit item recent wala upr aye
        })
        return res.status(200).json(shop)

    }
    catch (error) {
        return res.status(500).json({ message: "edit item error" })
    }
}

//get my item
const getItemById = async (req, res) => {
    try {
        const itemId = req.params.itemId
        const item = await ShopItem.findById(itemId)
        if (!item) {
            return res.status(400).json({ message: "Item not found" })
        }

        return res.status(200).json(item)
    }
    catch (error) {
        console.log("getting eror in item ", error)

    }
}

//to delete the shop item
const deleteItem = async (req, res) => {
    try {
        const itemId = req.params.itemId
        const item = await ShopItem.findByIdAndDelete(itemId)
        if (!item) {
            return res.status(400).json({ message: "Item not found" })
        }
        const shop = await Shop.findOne({ owner: req.userId })
        shop.items = shop.items.filter(i => i.toString() !== item._id.toString())
        await shop.save()
        await shop.populate("items")
        return res.status(200).json(shop)
    }
    catch (error) {
        console.log("deleting eror in item ", error)
        return res.status(500).json({ message: "delete item error" });
    }
}

const getItemByCity = async (req, res) => {
    try {
        const { city } = req.params
        if (!city) {
            return res.status(400).json({ message: "City is required" })
        }
        const shops = await Shop.find({
            city: { $regex: new RegExp(`^${city}$`, "i") }
        }).populate("items")
        if (!shops) {
            return res.status(400).json({ message: "Shop is not found" })
        }
        const shopIds = shops.map((shop) => shop._id)
        const items = await ShopItem.find({ shop: { $in: shopIds } })

        return res.status(200).json(items)
    }
    catch (error) {
        return res.status(500).json({ message: `item city me error ${error}` })
    }
}

const getItemByShop = async (req, res) => {
    try {
        const { shopId } = req.params
        const shop = await Shop.findById(shopId).populate("items")
        if (!shop) {
            return res.status(400).json("shop not found")
        }
        return res.status(200).json({
            shop, items: shop.items
        })
    }
    catch (error) {
        return res.status(500).json({ message: `get item by shop error ${error} ` })
    }
}

//search querry
const searchItems = async (req, res) => {
    try {
        const { query, city } = req.query
        if (!query || !city) {
            return null
        }
        const shops = await Shop.find({
            city: { $regex: new RegExp(`^${city}$`, "i") }
        }).populate("items")
        if (!shops) {
            return res.status(404).json({ message: "Shop is not found" })
        }
        const shopIds = shops.map(s=>s._id)
        const items=await ShopItem.find({
            shop:{$in:shopIds},
            $or:[
                {name:{$regex:query,$options:"i"}},
                {category:{$regex:query,$options:"i"}}
            ]
        }).populate("shop","name image")
        return res.status(200).json(items)
    } catch (error) {
        return res.status(500).json({ message: `search item error ${error} ` })
    }
}

module.exports = { addItem, editItem, getItemById, deleteItem, getItemByCity, getItemByShop, searchItems }