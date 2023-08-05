import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const connectToDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    console.log("Connected to DB");
  } catch (error) {
    console.log(error);
  }
};

export default connectToDB;
