import dotenv from "dotenv";
import mongoose, { ConnectOptions } from "mongoose";

dotenv.config();

const DATABASE_URL: string = process.env.DATABASE_URL ?? '';

const connectDB = () => {
  return mongoose.connect(DATABASE_URL, {useUnifiedTopology: true, useNewUrlParser: true} as ConnectOptions, err => {
    if (err){
      console.error('Connection to DB failed');
    } else{
      console.log('Connection to DB was successful');
    }
  })
}

const db = mongoose.connection;

db.on('error', console.error.bind(console, "MongoDB connection failed"));

export default connectDB;