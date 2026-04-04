const mongoose = require("mongoose")

const shopItemSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:false,
    },
    shop:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Shop"
    },
    category:{
       type:String,
       enum:["Snacks","Main Course", "Desserts", "Pizza", "Burgers","Sandwiches","South Indian","North Indian", "Chinese","Fast food", "others"], 
       required:true,
    },
    price:{
        type:Number,
        min:0,
        required:true,
    },
    foodType:{
        type:String,
        enum:["veg", "non-veg"],
        required:true,

    },
    rating:{
        average:{type:Number,default:0},
        count:{type:Number,default:0}
    }

},{timestamps:true})

const ShopItem = mongoose.model("ShopItem", shopItemSchema)
module.exports = ShopItem