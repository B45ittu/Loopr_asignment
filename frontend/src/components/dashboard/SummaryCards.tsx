import React from 'react';
import styles from './SummaryCards.module.css';

interface SummaryCardsProps {
  balance: number;
  revenue: number;
  expenses: number;
  savings: number;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ balance, revenue, expenses, savings }) => (
  <div className={styles.cardsRow}>
    <div className={styles.card + ' ' + styles.balance}>
      <div>Balance</div>
      <div className={styles.amount}>${balance.toLocaleString()}</div>
    </div>
    <div className={styles.card + ' ' + styles.revenue}>
      <div>Revenue</div>
      <div className={styles.amount}>${revenue.toLocaleString()}</div>
    </div>
    <div className={styles.card + ' ' + styles.expenses}>
      <div>Expenses</div>
      <div className={styles.amount}>-${expenses.toLocaleString()}</div>
    </div>
    <div className={styles.card + ' ' + styles.savings}>
      <div>Savings</div>
      <div className={styles.amount}>${savings.toLocaleString()}</div>
    </div>
  </div>
);

export default SummaryCards; 