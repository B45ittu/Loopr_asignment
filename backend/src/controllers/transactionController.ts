import Transaction from '../models/Transaction';
import { Request, Response } from 'express';

export const getAllTransactions = async (req: Request, res: Response) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getTransactionById = async (req: Request, res: Response) => {
  try {
    const transaction = await Transaction.findOne({ id: req.params.id });
    if (!transaction) return res.status(404).json({ message: 'Transaction not found' });
    res.json(transaction);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const filterTransactions = async (req: Request, res: Response) => {
  try {
    const { user_id, category, status, page = 1, limit = 20 } = req.query;
    const filter: any = {};
    if (user_id) filter.user_id = user_id;
    if (category) filter.category = category;
    if (status) filter.status = status;
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    const total = await Transaction.countDocuments(filter);
    const transactions = await Transaction.find(filter)
      .sort({ date: -1 })
      .skip(skip)
      .limit(parseInt(limit as string));
    res.json({ transactions, total, page: parseInt(page as string), limit: parseInt(limit as string) });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createTransaction = async (req: Request, res: Response) => {
  try {
    if (req.body.category === 'Revenue') {
      req.body.amount = Math.abs(req.body.amount);
    } else if (req.body.category === 'Expense') {
      req.body.amount = -Math.abs(req.body.amount);
    }
    const transaction = new Transaction(req.body);
    await transaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateTransaction = async (req: Request, res: Response) => {
  try {
    if (req.body.category === 'Revenue') {
      req.body.amount = Math.abs(req.body.amount);
    } else if (req.body.category === 'Expense') {
      req.body.amount = -Math.abs(req.body.amount);
    }
    const transaction = await Transaction.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    if (!transaction) return res.status(404).json({ message: 'Transaction not found' });
    res.json(transaction);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteTransaction = async (req: Request, res: Response) => {
  try {
    const transaction = await Transaction.findOneAndDelete({ id: req.params.id });
    if (!transaction) return res.status(404).json({ message: 'Transaction not found' });
    res.json({ message: 'Transaction deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}; 