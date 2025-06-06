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
    <form onSubmit={handleSubmit} className="card">
      <h2 className="text-xl font-semibold mb-4 text-text-dark dark:text-text-light">Agregar Transacción</h2>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descripción"
        className="input"
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Cantidad"
        className="input"
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="select"
      >
        <option value="expense">Gasto</option>
        <option value="income">Ingreso</option>
      </select>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="select"
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
          className="input"
        />
        <button
          onClick={handleAddCategory}
          className="btn-secondary"
        >
          Agregar
        </button>
      </div>
      <button
        type="submit"
        className="btn-primary w-full"
      >
        Agregar Transacción
      </button>
      <div className="mt-4">
        <label className="block mb-2 text-text-dark dark:text-text-light">Presupuesto Mensual</label>
        <input
          type="number"
          value={budget}
          onChange={(e) => setBudget(parseFloat(e.target.value) || 0)}
          className="input"
        />
      </div>
    </form>
  );
};

export default TransactionForm;