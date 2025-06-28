import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://snehalelkiwar618:jyjBFHkdUQZxL3VD@cluster0.q4qk4jj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};   