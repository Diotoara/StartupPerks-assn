import mongoose from "mongoose"

const connectDB = async() => {
    console.log("mongo url : ",process.env.MONGO_DB_URL)
    try {
        await mongoose.connect(process.env.MONGO_DB_URL!)
        console.log("Successfully connected to mongo DB")
    } catch (error) {
        console.log("Database connection failed: ", error);
        process.exit(1);
    }
};

export default connectDB
