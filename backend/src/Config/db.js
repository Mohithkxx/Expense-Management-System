import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const monogdb = process.env.MONGODB_URI

if(!monogdb){
    throw new Error('Missing MONGODB_URI environment variable')
}

const HandlerDatabase = async (req, res) =>{
    try {
        await mongoose.connect(monogdb)
        console.log("Server connection established :)");
        
    } catch (error) {
        console.error(error);
        message:"invalid MONGODB connection"
    }
}

export default HandlerDatabase;