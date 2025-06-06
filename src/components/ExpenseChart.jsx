import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useState } from 'react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ExpenseChart = ({ transactions }) => {
  const [chartType, setChartType] = useState('category');

  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const categoryData = {
    labels: Object.keys(expensesByCategory),
    datasets: [{
      label: 'Gastos por Categoría',
      data: Object.values(expensesByCategory),
      backgroundColor: 'rgba(54, 162, 235, 0.6)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    }],
  };

  const expensesByDay = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      const day = new Date(t.date).getDate();
      acc[day] = (acc[day] || 0) + t.amount;
      return acc;
    }, {});

  const dayData = {
    labels: Object.keys(expensesByDay).sort((a, b) => a - b),
    datasets: [{
      label: 'Gastos por Día',
      data: Object.values(expensesByDay),
      backgroundColor: 'rgba(255, 99, 132, 0.6)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    }],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: chartType === 'category' ? 'Gastos por Categoría' : 'Gastos por Día del Mes',
      },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <div className="flex justify-center mb-4 space-x-2">
        <button
          onClick={() => setChartType('category')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Por Categoría
        </button>
        <button
          onClick={() => setChartType('day')}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Por Día
        </button>
      </div>
      <Bar data={chartType === 'category' ? categoryData : dayData} options={options} />
    </div>
  );
};

export default ExpenseChart;