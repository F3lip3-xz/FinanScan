import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const IncomeVsExpenseChart = ({ transactions }) => {
  const incomeByDay = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => {
      const day = new Date(t.date).getDate();
      acc[day] = (acc[day] || 0) + t.amount;
      return acc;
    }, {});

  const expenseByDay = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      const day = new Date(t.date).getDate();
      acc[day] = (acc[day] || 0) + t.amount;
      return acc;
    }, {});

  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  const incomeData = days.map(day => incomeByDay[day] || 0);
  const expenseData = days.map(day => expenseByDay[day] || 0);

  const data = {
    labels: days,
    datasets: [
      {
        label: 'Ingresos',
        data: incomeData,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
      {
        label: 'Gastos',
        data: expenseData,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Ingresos vs. Gastos por Día del Mes' },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <Line data={data} options={options} />
    </div>
  );
};

export default IncomeVsExpenseChart;