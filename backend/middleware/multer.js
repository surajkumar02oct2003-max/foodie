const multer = require("multer") 
const path = require("path")

const storage = multer.diskStorage({
    destination:(req, file,cb) =>{
        cb(null,"./public")
    },
    filename:(req,file,cb)=>{
        cb(null, file.originalname)
        // const ext = path.extname(file.originalname);
        // const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;
        // cb(null, uniqueName);
    }
})

const upload = multer({storage})
module.exports = upload