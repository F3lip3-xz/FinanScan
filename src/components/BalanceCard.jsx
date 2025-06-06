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
    <div className="card">
      <h2 className="text-xl font-semibold mb-2 text-text-dark dark:text-text-light">Resumen Financiero</h2>
      <p className="text-lg text-text-dark dark:text-text-light">Saldo: ${balance.toFixed(2)}</p>
      <p className="text-lg text-text-dark dark:text-text-light">Presupuesto: ${budget.toFixed(2)}</p>
      <p className="text-lg text-text-dark dark:text-text-light">Gastos Totales: ${totalExpenses.toFixed(2)}</p>
      {isOverBudget && (
        <p className="text-danger-dark dark:text-danger-light mt-2">¡Alerta! Has excedido tu presupuesto.</p>
      )}
    </div>
  );
};

export default BalanceCard;