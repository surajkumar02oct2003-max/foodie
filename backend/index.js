const express = require("express")
const dotenv = require("dotenv")
dotenv.config() // ye .env file se data lene ke liye
const connectDb  = require("./config/db.js")
const cookieParser = require("cookie-parser")
const authRouter = require("./routes/auth.js")
const cors = require("cors")
const userRouter = require("./routes/user.js")
const shopRouter = require("./routes/shopRoute.js")
const itemRouter = require("./routes/shopItemRoute.js")
const orderRouter = require("./routes/order.js")

const app = express()
const port = process.env.PORT || 5000

// global middleware
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/shop", shopRouter)
app.use("/api/item", itemRouter)
app.use("/api/order", orderRouter)





 

connectDb();
app.listen(port, ()=>{
    console.log(`server started at ${port}`)
})
