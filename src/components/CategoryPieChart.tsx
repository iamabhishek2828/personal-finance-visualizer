import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

interface CategoryData {
  name: string;
  value: number;
}

interface CategoryPieChartProps {
  data: CategoryData[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6699', '#A569BD'];

const CategoryPieChart: React.FC<CategoryPieChartProps> = ({ data }) => {
  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={({ name, percent }) => `${name} (${((percent ?? 0) * 100).toFixed(0)}%)`}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default CategoryPieChart;