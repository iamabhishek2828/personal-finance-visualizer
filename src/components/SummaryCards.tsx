import React from 'react';

interface CategoryBreakdownItem {
  name: string;
  value: number;
}
interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
}
interface SummaryCardsProps {
  totalExpenses?: number;
  categoryBreakdown?: CategoryBreakdownItem[];
  recentTransactions?: Transaction[];
}

const inr = (amount: number) =>
  amount.toLocaleString("en-IN", { style: "currency", currency: "INR" });

const SummaryCards: React.FC<SummaryCardsProps> = ({
  totalExpenses = 0,
  categoryBreakdown = [
    { name: 'Food', value: 300 },
    { name: 'Rent', value: 700 },
    { name: 'Utilities', value: 200 }
  ],
  recentTransactions = []
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
      <div className="card flex flex-col items-center bg-gradient-to-br from-indigo-50 to-emerald-50">
        <span className="text-sm text-gray-500 mb-2">Total Expenses</span>
        <span className="text-4xl font-bold text-emerald-600 mb-1">
          {Number(totalExpenses).toLocaleString("en-IN", { style: "currency", currency: "INR" })}
        </span>
      </div>
      <div className="card bg-gradient-to-br from-indigo-50 to-emerald-50">
        <span className="text-sm text-gray-500 mb-2">Category Breakdown</span>
        <ul>
          {categoryBreakdown.map((item, idx) => (
            <li key={item.name + '-' + idx} className="flex justify-between py-1">
              <span className="font-medium">{item.name}</span>
              <span className="text-indigo-600 font-semibold">
                {Number(item.value).toLocaleString("en-IN", { style: "currency", currency: "INR" })}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="card bg-gradient-to-br from-indigo-50 to-emerald-50">
        <span className="text-sm text-gray-500 mb-2">Recent Transactions</span>
        <ul>
          {recentTransactions.map((transaction, idx) => (
            <li key={(transaction.id || idx) + '-' + idx} className="flex justify-between py-1">
              <span className="font-medium">{transaction.description}</span>
              <span className="text-emerald-700 font-semibold">
                {Number(transaction.amount).toLocaleString("en-IN", { style: "currency", currency: "INR" })}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SummaryCards;