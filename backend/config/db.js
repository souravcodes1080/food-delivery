import mongoose from "mongoose";

export const connectDb = async ()=>{
    if (!process.env.MONGODB_URI) {
        console.error('MongoDB URI is not defined. Please check your environment variables.');
        process.exit(1); // Exit the application process
    }
    await mongoose.connect(process.env.MONGODB_URI)
    .then(()=>console.log("Connected to Database"))
}

