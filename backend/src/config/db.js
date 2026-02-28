import mongoose from "mongoose";

export const connectDb = async ()=> {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log('MONGODB CONNECTED SUCCESSFULLY!');
    
  } catch (error) {
    console.error("Faialed");
    process.exit(1);
  }
}

