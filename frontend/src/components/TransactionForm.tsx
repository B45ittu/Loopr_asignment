import React, { useState, useEffect } from 'react';
import styles from './TransactionForm.module.css';

interface Transaction {
  id?: string;
  date: string;
  amount: number;
  category: string;
  status: string;
  user_id: string;
  user_profile?: string;
}

interface TransactionFormProps {
  transaction?: Transaction;
  onSubmit: (transaction: Omit<Transaction, 'id'>) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

const TransactionForm: React.FC<TransactionFormProps> = ({
  transaction,
  onSubmit,
  onCancel,
  isEditing = false
}) => {
  const [formData, setFormData] = useState<Omit<Transaction, 'id'>>({
    date: '',
    amount: 0,
    category: '',
    status: '',
    user_id: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (transaction) {
      setFormData({
        date: transaction.date,
        amount: transaction.amount,
        category: transaction.category,
        status: transaction.status,
        user_id: transaction.user_id
      });
    }
  }, [transaction]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    if (formData.amount === 0) {
      newErrors.amount = 'Amount cannot be zero';
    }

    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }

    if (!formData.status.trim()) {
      newErrors.status = 'Status is required';
    }

    if (!formData.user_id.trim()) {
      newErrors.user_id = 'User ID is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) || 0 : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const categories = [
    'Food & Dining',
    'Transportation',
    'Shopping',
    'Entertainment',
    'Healthcare',
    'Education',
    'Utilities',
    'Housing',
    'Travel',
    'Other'
  ];

  const statuses = ['Pending', 'Completed', 'Failed', 'Cancelled'];

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>{isEditing ? 'Edit Transaction' : 'Add New Transaction'}</h2>
          <button className={styles.closeButton} onClick={onCancel}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="date">Date *</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className={errors.date ? styles.error : ''}
            />
            {errors.date && <span className={styles.errorText}>{errors.date}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="amount">Amount *</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              step="0.01"
              placeholder="Enter amount"
              className={errors.amount ? styles.error : ''}
            />
            {errors.amount && <span className={styles.errorText}>{errors.amount}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="category">Category *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className={errors.category ? styles.error : ''}
            >
              <option value="">Select category</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && <span className={styles.errorText}>{errors.category}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="status">Status *</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className={errors.status ? styles.error : ''}
            >
              <option value="">Select status</option>
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            {errors.status && <span className={styles.errorText}>{errors.status}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="user_id">User ID *</label>
            <input
              type="text"
              id="user_id"
              name="user_id"
              value={formData.user_id}
              onChange={handleInputChange}
              placeholder="Enter user ID"
              className={errors.user_id ? styles.error : ''}
            />
            {errors.user_id && <span className={styles.errorText}>{errors.user_id}</span>}
          </div>

          <div className={styles.actions}>
            <button type="button" onClick={onCancel} className={styles.cancelButton}>
              Cancel
            </button>
            <button type="submit" className={styles.submitButton}>
              {isEditing ? 'Update Transaction' : 'Create Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm; 