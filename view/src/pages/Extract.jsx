import React from 'react';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { useTransactions } from '../hooks/useTransactions';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import ErrorMessage from '../components/UI/ErrorMessage';

const Extract = () => {
  const { transactions, loading, error, fetchTransactions } = useTransactions();

  const handleExportPDF = () => {
    // Implementar exportação para PDF
    alert('Funcionalidade de exportação será implementada em breve!');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Extrato da conta</h2>
      
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Transações recentes</h3>
          <button 
            onClick={handleExportPDF}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Exportar PDF
          </button>
        </div>
        
        {loading && (
          <div className="flex justify-center py-8">
            <LoadingSpinner />
          </div>
        )}
        
        {error && (
          <ErrorMessage message={error} onRetry={fetchTransactions} />
        )}
        
        {!loading && !error && (
          <div className="space-y-3">
            {transactions.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Nenhuma transação encontrada</p>
              </div>
            ) : (
              transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      transaction.tipo === 'credit' || transaction.valor > 0 ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {transaction.tipo === 'credit' || transaction.valor > 0 ? 
                        <ArrowDownLeft className="w-6 h-6 text-green-600" /> : 
                        <ArrowUpRight className="w-6 h-6 text-red-600" />
                      }
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{transaction.descricao}</p>
                      <p className="text-sm text-gray-500">{transaction.categoria || 'Transação'}</p>
                      <p className="text-xs text-gray-400">{transaction.data}</p>
                    </div>
                  </div>
                  <span className={`font-bold text-lg ${
                    transaction.tipo === 'credit' || transaction.valor > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.valor > 0 ? '+' : ''}R$ {Math.abs(transaction.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Extract;

