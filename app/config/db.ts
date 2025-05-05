import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();
export const connectToDB = async () => {
  if (mongoose.connections[0].readyState) return

  await mongoose.connect(process.env.MONGODB_URI!)
}
