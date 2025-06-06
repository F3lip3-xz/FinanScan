import { useState, useEffect } from 'react';

const TransactionForm = ({ onAddTransaction, budget, setBudget }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('food');
  const [customCategories, setCustomCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    const savedCategories = JSON.parse(localStorage.getItem('customCategories')) || [];
    setCustomCategories(savedCategories);
  }, []);

  useEffect(() => {
    localStorage.setItem('customCategories', JSON.stringify(customCategories));
  }, [customCategories]);

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCategory.trim() && !customCategories.includes(newCategory.trim())) {
      setCustomCategories([...customCategories, newCategory.trim()]);
      setCategory(newCategory.trim());
      setNewCategory('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount && description) {
      const transaction = {
        id: Date.now(),
        description,
        amount: parseFloat(amount),
        type,
        category,
        date: new Date().toISOString(),
      };
      onAddTransaction(transaction);
      setDescription('');
      setAmount('');
    }
  };

  const defaultCategories = ['food', 'transport', 'entertainment', 'other'];

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Agregar Transacción</h2>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descripción"
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Cantidad"
        className="w-full p-2 mb-2 border rounded"
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      >
        <option value="expense">Gasto</option>
        <option value="income">Ingreso</option>
      </select>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      >
        {defaultCategories.map(cat => (
          <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
        ))}
        {customCategories.map(cat => (
          <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
        ))}
      </select>
      <div className="flex space-x-2 mb-2">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Nueva categoría"
          className="w-full p-2 border rounded"
        />
        <button
          onClick={handleAddCategory}
          className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Agregar
        </button>
      </div>
      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Agregar Transacción
      </button>
      <div className="mt-4">
        <label className="block mb-2">Presupuesto Mensual</label>
        <input
          type="number"
          value={budget}
          onChange={(e) => setBudget(parseFloat(e.target.value) || 0)}
          className="w-full p-2 border rounded"
        />
      </div>
    </form>
  );
};

export default TransactionForm;