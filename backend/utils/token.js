const jwt = require("jsonwebtoken")


const genToken = async(userId) =>{
    try{
        //genreating token
        const token = await jwt.sign({userId},process.env.JWT_SECRET, {expiresIn:"7d"} )
        return token
    }
    catch(error){
        console.log(error)
    }
}

module.exports = genToken