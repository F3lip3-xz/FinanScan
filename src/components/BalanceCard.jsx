import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

const BalanceCard = ({ balance, budget, totalExpenses }) => {
  const isOverBudget = totalExpenses > budget && budget > 0;

  useEffect(() => {
    if (isOverBudget) {
      toast.error('¡Alerta! Has excedido tu presupuesto.');
    }
  }, [isOverBudget]);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Resumen Financiero</h2>
      <p className="text-lg">Saldo: ${balance.toFixed(2)}</p>
      <p className="text-lg">Presupuesto: ${budget.toFixed(2)}</p>
      <p className="text-lg">Gastos Totales: ${totalExpenses.toFixed(2)}</p>
      {isOverBudget && (
        <p className="text-red-500 mt-2">¡Alerta! Has excedido tu presupuesto.</p>
      )}
    </div>
  );
};

export default BalanceCard;