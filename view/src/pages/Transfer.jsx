import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTransactions } from '../hooks/useTransactions';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import ErrorMessage from '../components/UI/ErrorMessage';

const Transfer = () => {
  const { createTransaction, loading } = useTransactions();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    setError('');
    setSuccess(false);
    
    try {
      const transactionData = {
        contaDestinoId: 1, // Mock - em produção seria obtido do destinatário
        valor: parseFloat(data.amount),
        tipoTransacao: 'TRANSFERENCIA',
        descricao: data.description || 'Transferência PIX'
      };
      
      await createTransaction(transactionData);
      setSuccess(true);
      reset();
    } catch (err) {
      setError('Erro ao realizar transferência. Tente novamente.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Transferir dinheiro</h2>
      
      <div className="bg-white rounded-2xl shadow-md p-6">
        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800 font-medium">Transferência realizada com sucesso!</p>
          </div>
        )}
        
        {error && (
          <div className="mb-6">
            <ErrorMessage message={error} />
          </div>
        )}
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Destinatário *
            </label>
            <input
              {...register('recipient', { required: 'Destinatário é obrigatório' })}
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nome ou conta do destinatário"
              disabled={loading}
            />
            {errors.recipient && (
              <p className="text-red-600 text-sm mt-1">{errors.recipient.message}</p>
            )}
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Valor *
            </label>
            <input
              {...register('amount', { 
                required: 'Valor é obrigatório',
                min: { value: 0.01, message: 'Valor deve ser maior que zero' }
              })}
              type="number"
              step="0.01"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0,00"
              disabled={loading}
            />
            {errors.amount && (
              <p className="text-red-600 text-sm mt-1">{errors.amount.message}</p>
            )}
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Descrição (opcional)
            </label>
            <input
              {...register('description')}
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Motivo da transferência"
              disabled={loading}
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <>
                <LoadingSpinner size="small" className="mr-2" />
                Processando...
              </>
            ) : (
              'Transferir'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Transfer;

