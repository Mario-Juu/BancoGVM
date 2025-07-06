import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, Send, Download, Plus, Eye, EyeOff, Shield, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTransactions } from '../hooks/useTransactions';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import ErrorMessage from '../components/UI/ErrorMessage';

const Dashboard = () => {
  const { user } = useAuth();
  const { transactions, loading, error } = useTransactions();
  const [showBalance, setShowBalance] = useState(true);

  const quickActions = [
    { to: '/transfer', icon: Send, label: 'Transferir', color: 'text-blue-600' },
    { to: '/deposit', icon: Plus, label: 'Depositar', color: 'text-green-600' },
    { to: '/extract', icon: Download, label: 'Extrato', color: 'text-purple-600' },
    { to: '/cards', icon: CreditCard, label: 'Cartões', color: 'text-orange-600' }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Olá, {user?.name}!</h2>
        <p className="text-gray-600">Bem-vindo ao seu banco digital</p>
      </div>
      
      {/* Balance Card */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white mb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-blue-100 text-sm">Saldo disponível</p>
            <div className="flex items-center space-x-2">
              <span className="text-3xl font-bold">
                {showBalance ? `R$ ${user?.balance?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '••••••'}
              </span>
              <button onClick={() => setShowBalance(!showBalance)} className="text-white/80 hover:text-white">
                {showBalance ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <CreditCard className="w-8 h-8 text-white/80" />
        </div>
        <div className="flex justify-between items-end">
          <div>
            <p className="text-blue-100 text-xs">Conta: {user?.accountNumber}</p>
            <p className="text-blue-100 text-xs">{user?.accountType}</p>
          </div>
          <Shield className="w-6 h-6 text-white/60" />
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {quickActions.map((action) => {
          const IconComponent = action.icon;
          return (
            <Link
              key={action.label}
              to={action.to}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100"
            >
              <IconComponent className={`w-8 h-8 ${action.color} mb-3`} />
              <p className="text-sm font-medium text-gray-800">{action.label}</p>
            </Link>
          );
        })}
      </div>
      
      {/* Recent Transactions */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Últimas transações</h3>
        
        {loading && (
          <div className="flex justify-center py-8">
            <LoadingSpinner />
          </div>
        )}
        
        {error && (
          <ErrorMessage message={error} />
        )}
        
        {!loading && !error && (
          <div className="space-y-3">
            {transactions.slice(0, 3).map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.tipo === 'credit' || transaction.valor > 0 ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {transaction.tipo === 'credit' || transaction.valor > 0 ? 
                      <ArrowDownLeft className="w-5 h-5 text-green-600" /> : 
                      <ArrowUpRight className="w-5 h-5 text-red-600" />
                    }
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{transaction.descricao}</p>
                    <p className="text-sm text-gray-500">{transaction.data}</p>
                  </div>
                </div>
                <span className={`font-semibold ${
                  transaction.tipo === 'credit' || transaction.valor > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.valor > 0 ? '+' : ''}R$ {Math.abs(transaction.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

