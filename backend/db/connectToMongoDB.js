import mongoose from "mongoose";

const connectToMongoDB = async ()=> {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI,);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
        process.exit(1);
    }
};

export default connectToMongoDB;