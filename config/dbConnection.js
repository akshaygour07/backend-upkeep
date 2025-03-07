import mongoose from "mongoose";

const connectDB = async () => {
  const connectionOptions = {
    dbName: "UpKeep-Database",
  };
  try {
    await mongoose.connect(process.env.MONGO_URI, connectionOptions);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed", error.message);
    process.exit(1);
  }
};

export default connectDB;
