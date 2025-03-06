const mongoose = require("mongoose")

const connectDB = async () => {
    const connectionOptions = {
        dbName:"UpKeep-Database"
    }
    try {
        await mongoose.connect(process.env.MONGO_URI, connectionOptions)
        console.log("Mongodb connected successfully")
    } catch (error) {
        console.error("MongoDB connection failed...", error.message);
        process.exit(1);  
    }
}

module.exports = connectDB