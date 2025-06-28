import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import SummaryCards from '../components/dashboard/SummaryCards';
import OverviewChart from '../components/dashboard/OverviewChart';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import TransactionsTable from '../components/dashboard/TransactionsTable';
import FilterBar from '../components/dashboard/FilterBar';
import TransactionForm from '../components/TransactionForm';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface Transaction {
  id: number;
  date: string;
  amount: number;
  category: string;
  status: string;
  user_id: string;
  user_profile: string;
}

interface DashboardProps {
  onLogout?: () => void;
}

const getInitials = (name: string) => {
  const parts = name.split(' ');
  return parts.length > 1 ? parts[0][0] + parts[1][0] : parts[0][0];
};

const HomePage: React.FC<DashboardProps> = ({ onLogout }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [allTransactions, setAllTransactions] = useState<Transaction[]>([]); // for dropdown options
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [allFilteredTransactions, setAllFilteredTransactions] = useState<Transaction[]>([]);
  
  // Form states
  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  // Fetch all transactions once for dropdown options
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/transactions');
        if (!res.ok) throw new Error('Failed to fetch transactions');
        const data = await res.json();
        setAllTransactions(data);
      } catch {}
    };
    fetchAll();
  }, []);

  // Fetch all filtered transactions for graph/recent (not paginated)
  useEffect(() => {
    const fetchAllFiltered = async () => {
      try {
        const params = new URLSearchParams();
        if (selectedUser !== 'All') params.append('user_id', selectedUser);
        if (selectedCategory !== 'All') params.append('category', selectedCategory);
        if (selectedStatus !== 'All') params.append('status', selectedStatus);
        // Large limit to get all
        params.append('limit', '10000');
        const url = `http://localhost:3000/api/transactions/filter?${params.toString()}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch transactions');
        const data = await res.json();
        setAllFilteredTransactions(data.transactions);
      } catch {}
    };
    fetchAllFiltered();
  }, [selectedUser, selectedCategory, selectedStatus]);

  // Fetch filtered transactions from backend (paginated)
  useEffect(() => {
    const fetchFiltered = async () => {
      try {
        setLoading(true);
        setError('');
        const params = new URLSearchParams();
        if (selectedUser !== 'All') params.append('user_id', selectedUser);
        if (selectedCategory !== 'All') params.append('category', selectedCategory);
        if (selectedStatus !== 'All') params.append('status', selectedStatus);
        params.append('page', String(page));
        params.append('limit', String(limit));
        const url = `http://localhost:3000/api/transactions/filter?${params.toString()}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch transactions');
        const data = await res.json();
        setTransactions(data.transactions);
        setTotal(data.total);
      } catch (err: any) {
        setError(err.message || 'Error fetching transactions');
      } finally {
        setLoading(false);
      }
    };
    fetchFiltered();
  }, [selectedUser, selectedCategory, selectedStatus, page, limit]);

  // CRUD Functions
  const handleCreateTransaction = async (transactionData: Omit<Transaction, 'id'>) => {
    try {
      setFormLoading(true);
      const res = await fetch('http://localhost:3000/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transactionData),
      });

      if (!res.ok) throw new Error('Failed to create transaction');

      // Refresh data
      window.location.reload();
      setShowForm(false);
    } catch (err: any) {
      setError(err.message || 'Error creating transaction');
    } finally {
      setFormLoading(false);
    }
  };

  const handleEditTransaction = async (transactionData: Omit<Transaction, 'id'>) => {
    if (!editingTransaction) return;

    try {
      setFormLoading(true);
      const res = await fetch(`http://localhost:3000/api/transactions/${editingTransaction.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transactionData),
      });

      if (!res.ok) throw new Error('Failed to update transaction');

      // Refresh data
      window.location.reload();
      setShowForm(false);
      setEditingTransaction(null);
    } catch (err: any) {
      setError(err.message || 'Error updating transaction');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteTransaction = async (transactionId: number) => {
    if (!window.confirm('Are you sure you want to delete this transaction?')) return;

    try {
      const res = await fetch(`http://localhost:3000/api/transactions/${transactionId}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete transaction');

      // Refresh data
      window.location.reload();
    } catch (err: any) {
      setError(err.message || 'Error deleting transaction');
    }
  };

  const openCreateForm = () => {
    setEditingTransaction(null);
    setShowForm(true);
  };

  const openEditForm = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingTransaction(null);
  };

  // Get unique users, categories, and statuses for dropdowns
  const userList = Array.from(new Set(allTransactions.map(t => t.user_id)));
  const categoryList = Array.from(new Set(allTransactions.map(t => t.category)));
  const statusList = Array.from(new Set(allTransactions.map(t => t.status)));

  // Search filter (client-side, for name/category)
  const filteredTransactions = allFilteredTransactions.filter(t =>
    t.user_id.toLowerCase().includes(search.toLowerCase()) ||
    t.category.toLowerCase().includes(search.toLowerCase())
  );
  const paginatedTransactions = transactions.filter(t =>
    t.user_id.toLowerCase().includes(search.toLowerCase()) ||
    t.category.toLowerCase().includes(search.toLowerCase())
  );

  // Calculate summary values from filteredTransactions (all, for graph)
  const revenue = filteredTransactions
    .filter(t => t.category === 'Revenue')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const expenses = filteredTransactions
    .filter(t => t.category === 'Expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const balance = revenue - expenses;
  const savings = balance;

  // Recent transactions (latest 3 from all filtered)
  const recentTransactions = [...filteredTransactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3);

  // Prepare data for Chart.js (all filtered)
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const incomeByMonth = Array(12).fill(0);
  const expensesByMonth = Array(12).fill(0);
  filteredTransactions.forEach(t => {
    const d = new Date(t.date);
    const month = d.getMonth();
    if (t.category === 'Revenue') incomeByMonth[month] += Math.abs(t.amount);
    else if (t.category === 'Expense') expensesByMonth[month] += Math.abs(t.amount);
  });
  const chartData = {
    labels: months,
    datasets: [
      {
        label: 'Income',
        data: incomeByMonth,
        borderColor: '#4caf50',
        backgroundColor: 'rgba(76,175,80,0.1)',
        tension: 0.4,
        fill: false,
        pointRadius: 4,
      },
      {
        label: 'Expenses',
        data: expensesByMonth,
        borderColor: '#ff9800',
        backgroundColor: 'rgba(255,152,0,0.1)',
        tension: 0.4,
        fill: false,
        pointRadius: 4,
      },
    ],
  };
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: { color: '#fff', font: { size: 14 } },
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (ctx: any) => `${ctx.dataset.label}: $${ctx.parsed.y.toFixed(2)}`,
        },
      },
    },
    scales: {
      x: {
        ticks: { color: '#aaa' },
        grid: { color: '#333' },
      },
      y: {
        ticks: { color: '#aaa' },
        grid: { color: '#333' },
      },
    },
  };

  const downloadCSV = () => {
    const headers = ['Date', 'Amount', 'Category', 'Status', 'User ID'];
    const csvContent = [
      headers.join(','),
      ...filteredTransactions.map(t => [
        t.date,
        t.amount,
        t.category,
        t.status,
        t.user_id
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#111217' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#111217' }}>
        <TopBar onLogout={onLogout} search={search} setSearch={setSearch} />
        <div style={{ flex: 1, padding: '24px', overflow: 'auto', background: '#111217' }}>
          <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ color: '#fff', margin: 0, fontSize: '28px', fontWeight: '700' }}>Dashboard</h1>
            <button 
              onClick={openCreateForm}
              style={{
                background: 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: '12px',
                padding: '12px 24px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(76, 175, 80, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(76, 175, 80, 0.3)';
              }}
            >
              + Add Transaction
            </button>
          </div>

          <div style={{ background: '#181a20', borderRadius: '14px', padding: '20px', boxShadow: '0 0 12px 0 #000', marginBottom: '24px' }}>
            <h3 style={{ color: '#fff', margin: '0 0 16px 0', fontSize: '20px', fontWeight: '600' }}>Filters & Export</h3>
            <FilterBar
              search={search}
              setSearch={setSearch}
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              userList={userList}
              categoryList={categoryList}
              statusList={statusList}
              downloadCSV={downloadCSV}
            />
          </div>

          <SummaryCards balance={balance} revenue={revenue} expenses={expenses} savings={savings} />
          
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '24px' }}>
            <div style={{ background: '#181a20', borderRadius: '14px', padding: '20px', boxShadow: '0 0 12px 0 #000' }}>
              <h3 style={{ color: '#fff', margin: '0 0 16px 0', fontSize: '20px', fontWeight: '600' }}>Overview</h3>
              <OverviewChart chartData={chartData} chartOptions={chartOptions} />
            </div>
            <div style={{ background: '#181a20', borderRadius: '14px', padding: '20px', boxShadow: '0 0 12px 0 #000' }}>
              <h3 style={{ color: '#fff', margin: '0 0 16px 0', fontSize: '20px', fontWeight: '600' }}>Recent Transactions</h3>
              <RecentTransactions recentTransactions={recentTransactions} getInitials={getInitials} />
            </div>
          </div>

          {error && (
            <div style={{ 
              background: 'rgba(255, 107, 107, 0.1)', 
              border: '1px solid #ff6b6b', 
              borderRadius: '8px', 
              padding: '12px', 
              marginBottom: '16px',
              color: '#ff6b6b'
            }}>
              {error}
            </div>
          )}

          <div style={{ background: '#181a20', borderRadius: '14px', padding: '20px', boxShadow: '0 0 12px 0 #000' }}>
            <h3 style={{ color: '#fff', margin: '0 0 16px 0', fontSize: '20px', fontWeight: '600' }}>Transactions</h3>
            <TransactionsTable
              paginatedTransactions={paginatedTransactions}
              page={page}
              totalPages={totalPages}
              setPage={setPage}
              getInitials={getInitials}
              onEdit={openEditForm}
              onDelete={handleDeleteTransaction}
            />
          </div>
        </div>
      </div>

      {showForm && (
        <TransactionForm
          transaction={editingTransaction || undefined}
          onSubmit={editingTransaction ? handleEditTransaction : handleCreateTransaction}
          onCancel={closeForm}
          isEditing={!!editingTransaction}
        />
      )}
    </div>
  );
};

export default HomePage; 