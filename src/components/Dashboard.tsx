"use client";
import React, { useEffect, useState } from 'react';
import TransactionList from './TransactionList';
import ExpenseBarChart from './ExpenseBarChart';
import CategoryPieChart from './CategoryPieChart';
import SummaryCards from './SummaryCards';
import BudgetComparisonChart from './BudgetComparisonChart';
import AddTransactionForm from './AddTransactionForm';

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch transactions from API on mount
  useEffect(() => {
    fetch('/api/transactions')
      .then(res => res.json())
      .then(data => {
        setTransactions(data);
        setLoading(false);
      });
  }, []);

  // Add transaction via API
  const handleAdd = async (tx: { description: string; amount: number; date: string; category: string }) => {
    const res = await fetch('/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tx),
    });
    const newTx = await res.json();
    setTransactions(prev => [...prev, newTx]);
  };

  // Delete transaction via API
  const handleDelete = async (id: string) => {
    await fetch('/api/transactions', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    setTransactions(prev => prev.filter(tx => tx._id !== id && tx.id !== id));
  };

  // Compute summaries and chart data
  const totalExpenses = transactions.reduce((sum, tx) => sum + Number(tx.amount), 0);

  const categoryBreakdown = Array.from(
    transactions.reduce((map, tx) => {
      map.set(tx.category, (map.get(tx.category) || 0) + Number(tx.amount));
      return map;
    }, new Map<string, number>()),
    ([name, value]) => ({ name, value })
  );

  // Monthly bar chart data
  const barChartData = Array.from(
    transactions.reduce((map, tx) => {
      const month = new Date(tx.date).toLocaleString('default', { month: 'short' });
      map.set(month, (map.get(month) || 0) + Number(tx.amount));
      return map;
    }, new Map<string, number>()),
    ([month, amount]) => ({ month, amount })
  );

  // Example: Budget data (static for demo)
  const budgetData = [
    { month: 'Jan', budgeted: 1000, actual: 900 },
    { month: 'Feb', budgeted: 1200, actual: 1100 },
    { month: 'Mar', budgeted: 900, actual: 950 },
  ];

  if (loading) return <div className="dashboard-container">Loading...</div>;

  return (
    <div className="dashboard-container">
      <h2 className="section-title">Personal Finance Dashboard</h2>
      <div className="card" style={{ marginBottom: 32 }}>
        <AddTransactionForm onAdd={handleAdd} />
      </div>
      <div className="card">
        <div className="highlight">Total Expenses</div>
        <div className="price">{totalExpenses.toLocaleString("en-IN", { style: "currency", currency: "INR" })}</div>
      </div>
      <div className="card">
        <div className="highlight">Category Breakdown</div>
        {categoryBreakdown.map((item, idx) => (
          <div key={item.name + idx} className="flex justify-between items-center mb-2">
            <span className="font-semibold">{item.name}</span>
            <span className="price">{Number(item.value).toLocaleString("en-IN", { style: "currency", currency: "INR" })}</span>
          </div>
        ))}
      </div>
      <div className="card">
        <div className="highlight">Recent Transactions</div>
        {transactions.slice(-5).reverse().map((tx, idx) => (
          <div key={tx._id || tx.id || idx} className="flex justify-between items-center mb-2">
            <span className="font-semibold">{tx.description}</span>
            <span className="price">{Number(tx.amount).toLocaleString("en-IN", { style: "currency", currency: "INR" })}</span>
          </div>
        ))}
      </div>
      <div className="divider w-full max-w-4xl" />
      <div className="charts-container grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
        <ExpenseBarChart data={barChartData} />
        <div className="w-full flex justify-center my-8">
          <CategoryPieChart data={categoryBreakdown} />
        </div>
      </div>
      <div className="divider w-full max-w-4xl" />
      <BudgetComparisonChart budgetData={budgetData} />
      <div className="divider w-full max-w-4xl" />
      {/* Only for Transaction History */}
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <div className="card" style={{ maxWidth: 700, width: '100%' }}>
          <TransactionList
            transactions={transactions}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;