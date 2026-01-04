import mongoose, { mongo } from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

export const connectDB =  async ()=>{
    try {
       const response =  await mongoose.connect(process.env.MONGO_URI)
         if(response){
            console.log("mongodb connected successfully")
         }
    } catch (error) {
        console.log(error.message)
    }
}