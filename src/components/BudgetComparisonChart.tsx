import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface BudgetComparisonChartProps {
  budgetData: { month: string; budgeted: number; actual: number }[];
}

const BudgetComparisonChart: React.FC<BudgetComparisonChartProps> = ({ budgetData }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={budgetData}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="budgeted" fill="#8884d8" />
        <Bar dataKey="actual" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BudgetComparisonChart;