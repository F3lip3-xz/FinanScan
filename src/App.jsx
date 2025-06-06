import { useState, useEffect } from 'react';
import TransactionForm from './components/TransactionForm';
import BalanceCard from './components/BalanceCard';
import ExpenseChart from './components/ExpenseChart';
import IncomeVsExpenseChart from './components/IncomeVsExpenseChart';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [budget, setBudget] = useState(0);
  const [theme, setTheme] = useState('light');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  useEffect(() => {
    const savedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    const savedBudget = parseFloat(localStorage.getItem('budget')) || 0;
    setTransactions(savedTransactions);
    setBudget(savedBudget);
  }, []);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
    localStorage.setItem('budget', budget);
  }, [transactions, budget]);

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
    toast.success(`Transacción agregada: ${transaction.description} (${transaction.type === 'income' ? 'Ingreso' : 'Gasto'})`);
  };

  const filteredTransactions = transactions.filter(t => {
    const transactionDate = new Date(t.date);
    return transactionDate.getMonth() === selectedMonth;
  });

  const totalIncome = filteredTransactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);
  const totalExpenses = filteredTransactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);
  const balance = totalIncome - totalExpenses;

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark');
  };

  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  return (
    <div className={`min-h-screen p-4 ${theme === 'light' ? 'bg-gray-100 text-gray-900' : 'bg-gray-900 text-gray-100'} transition-colors duration-300`}>
      <h1 className="text-3xl font-bold text-center mb-6">FinanScan</h1>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={toggleTheme}
          className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          {theme === 'light' ? 'Modo Oscuro' : 'Modo Claro'}
        </button>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
          className="p-2 border rounded"
        >
          {months.map((month, index) => (
            <option key={index} value={index}>{month}</option>
          ))}
        </select>
      </div>
      <div className="max-w-4xl mx-auto space-y-6">
        <TransactionForm onAddTransaction={addTransaction} budget={budget} setBudget={setBudget} />
        <BalanceCard balance={balance} budget={budget} totalExpenses={totalExpenses} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ExpenseChart transactions={filteredTransactions} />
          <IncomeVsExpenseChart transactions={filteredTransactions} />
        </div>
      </div>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
}

export default App;