const cloudinary = require('cloudinary').v2
const fs = require("fs")

const uploadOnCloudinary = async (file) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
    try {
 
        const result = await cloudinary.uploader.upload(file)

        //to delete the file from public
        fs.unlinkSync(file)
        return result.secure_url
    }
    catch (error) {
        fs.unlinkSync(file)
        console.log((error))
    }
}

module.exports = uploadOnCloudinary

// const cloudinary = require("cloudinary").v2;
// const fs = require("fs");
// const path = require("path");

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET
// });

// const uploadOnCloudinary = async (filePath) => {
//     try {
//         const absolutePath = path.resolve(filePath);  // FIX

//         const result = await cloudinary.uploader.upload(absolutePath, {
//             resource_type: "auto",
//         });

//         fs.unlinkSync(absolutePath); // delete after upload
//         return result.secure_url;

//     } catch (error) {
//         console.log("Cloudinary Upload Error:", error.message);
//         try { fs.unlinkSync(filePath); } catch {}
//         return null;
//     }
// };

// module.exports = uploadOnCloudinary;
