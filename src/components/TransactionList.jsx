const TransactionList = ({ transactions, onDeleteTransaction }) => {
  if (transactions.length === 0) {
    return <p className="text-center text-text-dark dark:text-text-light">No hay transacciones para mostrar.</p>;
  }

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4 text-text-dark dark:text-text-light">Lista de Transacciones</h2>
      <ul className="space-y-2">
        {transactions.map((transaction) => (
          <li
            key={transaction.id}
            className="flex justify-between items-center p-2 border-b border-accent-dark dark:border-accent-light"
          >
            <div>
              <p className="font-medium text-text-dark dark:text-text-light">{transaction.description}</p>
              <p className="text-sm text-gray-500">
                {new Date(transaction.date).toLocaleDateString('es-ES')} - {transaction.category.charAt(0).toUpperCase() + transaction.category.slice(1)}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <p
                className={`font-medium ${
                  transaction.type === 'income' ? 'text-secondary-dark dark:text-secondary-light' : 'text-danger-dark dark:text-danger-light'
                }`}
              >
                {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
              </p>
              <button
                onClick={() => onDeleteTransaction(transaction.id)}
                className="btn-danger"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;