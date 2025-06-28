import React from 'react';
import { Avatar } from '@mui/material';
import styles from './TransactionsTable.module.css';

interface Transaction {
  id: number;
  date: string;
  amount: number;
  category: string;
  status: string;
  user_id: string;
}

interface TransactionsTableProps {
  paginatedTransactions: Transaction[];
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
  getInitials: (name: string) => string;
  onEdit: (transaction: Transaction) => void;
  onDelete: (transactionId: number) => void;
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({ 
  paginatedTransactions, 
  page, 
  totalPages, 
  setPage, 
  getInitials,
  onEdit,
  onDelete
}) => (
  <div className={styles.tableWrapper}>
    <table className={styles.table}>
      <thead>
        <tr className={styles.headerRow}>
          <th>Name</th>
          <th>Date</th>
          <th>Category</th>
          <th className={styles.amountHeader}>Amount</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {paginatedTransactions.map(t => (
          <tr key={t.id} className={styles.bodyRow}>
            <td className={styles.nameCell}>
              <Avatar className={styles.avatar} sx={{ width: 32, height: 32, bgcolor: '#9c27b0', color: '#fff', fontWeight: 700, mr: 1 }}>
                {getInitials(t.user_id)}
              </Avatar>
              {t.user_id}
            </td>
            <td>{new Date(t.date).toDateString()}</td>
            <td className={styles.categoryCell}>{t.category}</td>
            <td className={styles.amountCell + ' ' + (t.amount > 0 ? styles.positive : styles.negative)}>
              {t.amount > 0 ? '+' : ''}${t.amount.toFixed(2)}
            </td>
            <td>
              <span className={styles.status + ' ' + styles[t.status.toLowerCase()]}>{t.status}</span>
            </td>
            <td className={styles.actionsCell}>
              <div className={styles.actionButtons}>
                <button 
                  onClick={() => onEdit(t)} 
                  className={styles.editButton}
                  title="Edit transaction"
                >
                  ✏️
                </button>
                <button 
                  onClick={() => onDelete(t.id)} 
                  className={styles.deleteButton}
                  title="Delete transaction"
                >
                  🗑️
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className={styles.pagination}>
      <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className={styles.pageBtn}>Prev</button>
      <span className={styles.pageInfo}>Page {page} of {totalPages}</span>
      <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages} className={styles.pageBtn}>Next</button>
    </div>
  </div>
);

export default TransactionsTable; 