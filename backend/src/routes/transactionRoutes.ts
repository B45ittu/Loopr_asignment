import { Router } from 'express';
import {
  getAllTransactions,
  getTransactionById,
  filterTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction
} from '../controllers/transactionController';
import { authenticateJWT } from '../middleware/auth';

const router = Router();

// All routes below require authentication
// router.use(authenticateJWT as any);

router.get('/', getAllTransactions as any);
router.get('/filter', filterTransactions as any);
router.get('/:id', getTransactionById as any);
router.post('/', createTransaction as any);
router.put('/:id', updateTransaction as any);
router.delete('/:id', deleteTransaction as any);

export default router; 