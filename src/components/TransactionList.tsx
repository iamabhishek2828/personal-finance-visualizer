import React from 'react';

interface Transaction {
  _id?: string;
  id?: string;
  amount: number;
  date: string;
  description: string;
}

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

export default function TransactionList({ transactions, onDelete }: TransactionListProps) {
  return (
    <div>
      <h3 className="section-title">Transaction History</h3>
      <ul>
        {transactions.map((tx, idx) => (
          <li key={tx._id || tx.id || idx} className="summary-card">
            <span>
              {tx.description} - {Number(tx.amount).toLocaleString("en-IN", { style: "currency", currency: "INR" })} on {tx.date}
            </span>
            <button onClick={() => onDelete(tx._id || tx.id || String(idx))} className="ml-4 text-red-600 hover:underline">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}