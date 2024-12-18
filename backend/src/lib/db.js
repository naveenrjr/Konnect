import mongoose from "mongoose";

export const connectDB = async ()=>{
    try{
        const connect = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`connected to Mongo DB ${connect.connection.host}`);
    }catch(err){
        console.log("Error connecting to Database. Try Again.")
    }
};
