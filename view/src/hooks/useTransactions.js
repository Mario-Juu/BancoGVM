import { useState, useEffect } from 'react';
import { transacaoService } from '../services/transacaoService';

export const useTransactions = (contaId = null) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTransactions = async () => {
    setLoading(true);
    setError(null);
    try {
      let data;
      if (contaId) {
        data = await transacaoService.obterExtrato(contaId);
      } else {
        data = await transacaoService.listarTransacoes();
      }
      setTransactions(data);
    } catch (err) {
      setError(err.message);
      // Fallback para dados mock em caso de erro
      setTransactions([
        { id: 1, tipo: 'credit', descricao: 'Depósito', valor: 1500.00, data: '2025-06-20', categoria: 'Entrada' },
        { id: 2, tipo: 'debit', descricao: 'Pagamento PIX', valor: -89.50, data: '2025-06-19', categoria: 'Transferência' },
        { id: 3, tipo: 'debit', descricao: 'Compra Supermercado', valor: -245.30, data: '2025-06-18', categoria: 'Compras' },
        { id: 4, tipo: 'credit', descricao: 'Salário', valor: 3500.00, data: '2025-06-15', categoria: 'Entrada' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const createTransaction = async (transactionData) => {
    setLoading(true);
    setError(null);
    try {
      const newTransaction = await transacaoService.criarTransacao(transactionData);
      setTransactions(prev => [newTransaction, ...prev]);
      return newTransaction;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [contaId]);

  return {
    transactions,
    loading,
    error,
    fetchTransactions,
    createTransaction
  };
};

