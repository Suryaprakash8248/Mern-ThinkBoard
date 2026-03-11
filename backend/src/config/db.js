import mongoose from "mongoose";

export const connectDb = async ()=> {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log('MONGODB CONNECTED SUCCESSFULLY!');
    
  } catch (error) {
    console.error("Faialed",error);
    process.exit(1);
    
    
  }
}

