import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import Transaction from '../models/Transaction';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = 'mongodb+srv://snehalelkiwar618:jyjBFHkdUQZxL3VD@cluster0.q4qk4jj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const DATA_PATH = path.join(__dirname, '../../../transactions.json');

async function importTransactions() {
  try {
    console.log('Connecting to MongoDB at:', MONGO_URI);
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB!');
    const data = fs.readFileSync(DATA_PATH, 'utf-8');
    const transactions = JSON.parse(data);
    await Transaction.deleteMany({});
    await Transaction.insertMany(transactions);
    console.log('Transactions imported successfully!');
    process.exit();
  } catch (err) {
    console.error('Error importing transactions:', err);
    process.exit(1);
  }
}

importTransactions(); 