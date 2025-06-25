import mongoose from 'mongoose';
import dotenv from "dotenv";


dotenv.config();
const mongodbURl = process.env.mongodb_URI


export const connectDB = async () => {
    try {
        await mongoose.connect(mongodbURl)
        console.log("your database is connect successfully")
    } catch(error){
        console.error(error.message)
    }
}