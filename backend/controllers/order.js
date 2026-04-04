const Order = require("../models/orderModel.js")
const Shop = require("../models/shopModel.js")
const User = require("../models/userModel.js")

const placeOrder = async (req, res) => {
    try {
        const { cartItem, paymentMethod, deliveryAddress, totalAmount } = req.body
        if (!cartItem || cartItem.length == 0 ) {
            return res.status(400).json({ message: "cart is empty" })
        }
        if (!deliveryAddress.text || !deliveryAddress.latitude || !deliveryAddress.longitude) {
            return res.status(400).json({ message: "sent complete deliveryAddress" })
        }
        const groupItemsByShop = {} //creating an empty object

        cartItem.forEach(item => {
            const shopId = item.shop

            // ***
            if (!groupItemsByShop[shopId]) {
                groupItemsByShop[shopId] = []
            }

            groupItemsByShop[shopId].push(item)
            // groupItemsByShop[shopId].push(item)
        });
        const shopOrders = await Promise.all(Object.keys(groupItemsByShop).map(async (shopId) => {
            const shop = await Shop.findById(shopId).populate("owner")
            if (!shop) {
                return res.status(400).json({ message: "Shop not found" })
            }
            const items = groupItemsByShop[shopId]
            const subtotal = items.reduce((sum, i) => sum + Number(i.price) * i.quantity, 0)
            return {
                shop: shop._id,
                owner: shop.owner._id,
                subtotal,
                shopOrderItems: items.map((i) => ({
                    item: i.id,
                    price: i.price,
                    quantity: i.quantity,
                    name: i.name
                }))
            }
        }))

        const newOrder = await Order.create({
            user: req.userId,
            paymentMethod,
            deliveryAddress,
            totalAmount,
            shopOrders
        })
        await newOrder.populate("shopOrders.shopOrderItems.item","name image price")
        await newOrder.populate("shopOrders.shop","name")
        return res.status(201).json(newOrder)
    } catch (error) {
        return res.status(500).json({ message: `place order error ${error}` })
    }
}

//to get the all the order
const getMyOrders = async (req, res) => {
    try {
        // console.log("REQ.USERID:", req.userId) // 👈 ADD THIS

        // if (!req.userId) {
        //     return res.status(401).json({ message: "No userId in request" })
        // }
        const user = await User.findById(req.userId)
        if (!user) {
            return res.status(401).json({ message: "User not found or unauthorized" })
        }
        // let orders = []
        if (user.role == "user") {
            const orders = await Order.find({ user: req.userId })
                .sort({ createdAt: -1 })
                .populate("shopOrders.shop", "name")
                .populate("shopOrders.owner", "fullName email mobile")
                .populate("shopOrders.shopOrderItems.item", "name image price")
            return res.status(200).json(orders)
        } else if (user.role == "owner") {
            const orders = await Order.find({ "shopOrders.owner": req.userId })
                .sort({ createdAt: -1 })
                .populate("shopOrders.shop", "name")
                .populate("user")
                .populate("shopOrders.shopOrderItems.item", "name image price")
                
                const filterOrder = orders.map((order=>({
                    _id:order._id,
                    paymentMethod:order.paymentMethod,
                    user:order.user,
                    shopOrder:order.shopOrders.find(o=>o.owner._id==req.userId),
                    createdAt:order.createdAt,
                    deliveryAddress:order.deliveryAddress
                })))
            return res.status(200).json(filterOrder)
        }
        
    }
    catch (error) {
        return res.status(500).json({ message: `get user order error ${error}` })
        // return res.status(500).json({ message: error.message })
    }
}

//stataus controller
const updateorderStatus = async(req, res)=>{
    try{
        const {orderId,shopId} = req.params
        const {status} = req.body
        const order = await Order.findById(orderId)
        const shopOrder = order.shopOrders.find(o=>o.shop==shopId)
        if(!shopOrder){
            return res.status(400).json({message:"shop order not found"})
        }
        shopOrder.status = status
        await shopOrder.save()
        await order.save()
        // await shopOrder.populate("shopOrderItems.item","name image price")
        return res.status(200).json(shopOrder.status)
    }
    catch(error){
        return res.status(500).json({ message: `get update order status ${error}` })
    }
}

module.exports = { placeOrder, getMyOrders ,updateorderStatus}