
const mongoose = require("mongoose");

const connectDb = async() => {
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("db connected")

    } catch(error){
        console.log("db errror")
    }
}

module.exports = connectDb
