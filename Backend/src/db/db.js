import mongoose from "mongoose";


const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Database Connect Successfully");
        
    } catch (error) {
        console.log("Database Errror " , error);
        
    }
}


export default connectDB;