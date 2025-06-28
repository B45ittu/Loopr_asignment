import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';
import transactionRoutes from './routes/transactionRoutes';
import { connectDB } from './config/db';

dotenv.config();

const app = express();
app.use(express.json());

// const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/looper_assignment';
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);

app.get('/', (req, res) => {
  res.send('API is running');
}); 


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  

  connectDB().then(() => {
    console.log('Database connected successfully');
  }).catch((error) => {
    console.error('Database connection failed:', error);
  });
});


