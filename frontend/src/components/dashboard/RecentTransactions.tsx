import React from 'react';
import { Avatar } from '@mui/material';
import styles from './RecentTransactions.module.css';

interface Transaction {
  id: number;
  user_id: string;
  category: string;
  amount: number;
}

interface RecentTransactionsProps {
  recentTransactions: Transaction[];
  getInitials: (name: string) => string;
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({ recentTransactions, getInitials }) => (
  <div className={styles.recentList}>
    {recentTransactions.map(t => (
      <div key={t.id} className={styles.recentItem}>
        <Avatar className={styles.avatar} sx={{ width: 36, height: 36, bgcolor: '#9c27b0', color: '#fff', fontWeight: 700, mr: 1 }}>
          {getInitials(t.user_id)}
        </Avatar>
        <div className={styles.userInfo}>
          <div className={styles.userName}>{t.user_id}</div>
          <div className={styles.category}>{t.category}</div>
        </div>
        <div className={styles.amount + ' ' + (t.amount > 0 ? styles.positive : styles.negative)}>
          {t.amount > 0 ? '+' : ''}${t.amount.toFixed(2)}
        </div>
      </div>
    ))}
  </div>
);

export default RecentTransactions; 