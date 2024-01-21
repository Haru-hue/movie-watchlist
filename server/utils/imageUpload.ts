import dotenv from "dotenv"
import { v2 as cloudinary } from "cloudinary"
dotenv.config()

cloudinary.config({
    secure: true,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET_KEY
})

const imageUpload = async (image: string) => {
    const result = await cloudinary.uploader.upload(image)
    const imageURL = await result.secure_url
    return imageURL
}

export default imageUpload