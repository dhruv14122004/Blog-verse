import mongoose from "mongoose";

export const connectDb = async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/quick-blog`)
        console.log("Database connected");
    } catch (error) {
        console.log(error);
    }
}