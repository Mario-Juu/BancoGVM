import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ArrowDownLeft, CreditCard, Building2, DollarSign, Receipt, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import ErrorMessage from '../components/UI/ErrorMessage';

const Deposit = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [depositType, setDepositType] = useState('dinheiro');
  const [transactionId, setTransactionId] = useState('');
  
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm();

  const amount = watch('amount');

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    
    try {
      // Simular chamada para API de depósito
      // Em produção, seria algo como:
      // const response = await fetch('http://localhost:8080/api/transacoes', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     contaDestinoId: user.accountId,
      //     valor: parseFloat(data.amount),
      //     tipoTransacao: 'DEPOSITO',
      //     descricao: `Depósito ${depositType} - ${data.description || 'Sem descrição'}`
      //   })
      // });
      
      // Simular delay de processamento
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Gerar ID de transação simulado
      const mockTransactionId = 'DEP' + Date.now().toString().slice(-8);
      setTransactionId(mockTransactionId);
      setSuccess(true);
      reset();
      
    } catch (err) {
      setError('Erro ao processar depósito. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const depositTypes = [
    { value: 'dinheiro', label: 'Dinheiro', icon: DollarSign },
    { value: 'cheque', label: 'Cheque', icon: Receipt },
    { value: 'transferencia', label: 'Transferência', icon: Building2 }
  ];

  if (success) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-md p-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Depósito realizado com sucesso!</h2>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div>
                <p className="text-sm text-gray-600">ID da Transação</p>
                <p className="font-semibold text-gray-800">{transactionId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Valor</p>
                <p className="font-semibold text-green-600 text-lg">
                  R$ {parseFloat(amount || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Tipo</p>
                <p className="font-semibold text-gray-800 capitalize">{depositType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Data/Hora</p>
                <p className="font-semibold text-gray-800">
                  {new Date().toLocaleString('pt-BR')}
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <button
              onClick={() => setSuccess(false)}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Fazer outro depósito
            </button>
            <button
              onClick={() => window.print()}
              className="w-full bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              Imprimir comprovante
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Realizar Depósito</h2>
        <p className="text-gray-600">Adicione dinheiro à sua conta de forma rápida e segura</p>
      </div>

      {/* Saldo Atual */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-6 text-white mb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100 text-sm">Saldo atual</p>
            <p className="text-2xl font-bold">
              R$ {user?.balance?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
            <p className="text-green-100 text-xs">Conta: {user?.accountNumber}</p>
          </div>
          <ArrowDownLeft className="w-8 h-8 text-green-200" />
        </div>
      </div>
      
      <div className="bg-white rounded-2xl shadow-md p-6">
        {error && (
          <div className="mb-6">
            <ErrorMessage message={error} />
          </div>
        )}
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Tipo de Depósito */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-3">
              Tipo de Depósito *
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {depositTypes.map((type) => {
                const IconComponent = type.icon;
                return (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setDepositType(type.value)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      depositType === type.value
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    disabled={loading}
                  >
                    <IconComponent className={`w-6 h-6 mx-auto mb-2 ${
                      depositType === type.value ? 'text-blue-600' : 'text-gray-400'
                    }`} />
                    <p className="text-sm font-medium">{type.label}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Valor */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Valor do Depósito *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                R$
              </span>
              <input
                {...register('amount', { 
                  required: 'Valor é obrigatório',
                  min: { value: 0.01, message: 'Valor deve ser maior que zero' },
                  max: { value: 50000, message: 'Valor máximo por depósito: R$ 50.000,00' }
                })}
                type="number"
                step="0.01"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0,00"
                disabled={loading}
              />
            </div>
            {errors.amount && (
              <p className="text-red-600 text-sm mt-1">{errors.amount.message}</p>
            )}
            
            {/* Botões de valor rápido */}
            <div className="flex flex-wrap gap-2 mt-3">
              {[50, 100, 200, 500, 1000].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => {
                    const event = { target: { name: 'amount', value: value.toString() } };
                    register('amount').onChange(event);
                  }}
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                  disabled={loading}
                >
                  R$ {value}
                </button>
              ))}
            </div>
          </div>

          {/* Informações específicas por tipo */}
          {depositType === 'cheque' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Número do Cheque
                </label>
                <input
                  {...register('chequeNumber', { 
                    required: depositType === 'cheque' ? 'Número do cheque é obrigatório' : false
                  })}
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="000001"
                  disabled={loading}
                />
                {errors.chequeNumber && (
                  <p className="text-red-600 text-sm mt-1">{errors.chequeNumber.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Banco Emissor
                </label>
                <input
                  {...register('bankName')}
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nome do banco"
                  disabled={loading}
                />
              </div>
            </div>
          )}

          {depositType === 'transferencia' && (
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Banco de Origem
              </label>
              <select
                {...register('originBank', { 
                  required: depositType === 'transferencia' ? 'Banco de origem é obrigatório' : false
                })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              >
                <option value="">Selecione o banco</option>
                <option value="001">Banco do Brasil</option>
                <option value="104">Caixa Econômica Federal</option>
                <option value="237">Bradesco</option>
                <option value="341">Itaú</option>
                <option value="033">Santander</option>
                <option value="260">Nu Pagamentos</option>
                <option value="077">Banco Inter</option>
              </select>
              {errors.originBank && (
                <p className="text-red-600 text-sm mt-1">{errors.originBank.message}</p>
              )}
            </div>
          )}

          {/* Descrição */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Descrição (opcional)
            </label>
            <textarea
              {...register('description')}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Adicione uma descrição para este depósito..."
              disabled={loading}
            />
          </div>

          {/* Resumo */}
          {amount && parseFloat(amount) > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">Resumo do Depósito</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-blue-600">Valor:</span>
                  <span className="font-semibold text-blue-800">
                    R$ {parseFloat(amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-600">Tipo:</span>
                  <span className="font-semibold text-blue-800 capitalize">{depositType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-600">Novo saldo:</span>
                  <span className="font-semibold text-green-600">
                    R$ {(user?.balance + parseFloat(amount)).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !amount || parseFloat(amount) <= 0}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <>
                <LoadingSpinner size="small" className="mr-2" />
                Processando depósito...
              </>
            ) : (
              <>
                <ArrowDownLeft className="w-5 h-5 mr-2" />
                Confirmar Depósito
              </>
            )}
          </button>
        </form>

        {/* Informações importantes */}
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-semibold text-yellow-800 mb-2">Informações Importantes</h4>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Depósitos em dinheiro são creditados imediatamente</li>
            <li>• Depósitos em cheque podem levar até 2 dias úteis para compensação</li>
            <li>• Transferências são processadas em tempo real durante horário bancário</li>
            <li>• Valor máximo por depósito: R$ 50.000,00</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Deposit;

