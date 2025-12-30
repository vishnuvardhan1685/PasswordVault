import mongoose from "mongoose";

export async function connectDB() {
    const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
    if(!uri){
        throw new Error("MONGO_URI (or MONGODB_URI) is missing");
    }
    try {
        const conn = await mongoose.connect(uri);
        console.log(`MongoDB connected: ${conn.connection.host}/${conn.connection.name}`);
    }catch (error){
        console.log(`MongoDB connection failed: ${error.message}`);
        // In serverless environments we must NOT exit the process.
        throw error;
    }
}