import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();
const dbConnection = mongoose.connect(process.env.MONOGO_URL,{},console.log("connected to database"))

export default dbConnection;