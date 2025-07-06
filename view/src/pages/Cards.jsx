import React from 'react';
import { Plus, Shield, Download } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCards } from '../hooks/useCards';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import ErrorMessage from '../components/UI/ErrorMessage';

const Cards = () => {
  const { user } = useAuth();
  const { cards, loading, error, fetchCards, blockCard } = useCards();

  const handleBlockCard = async (cardId) => {
    if (window.confirm('Tem certeza que deseja bloquear este cartão?')) {
      try {
        await blockCard(cardId);
        alert('Cartão bloqueado com sucesso!');
      } catch (err) {
        alert('Erro ao bloquear cartão. Tente novamente.');
      }
    }
  };

  const cardActions = [
    {
      icon: Plus,
      title: 'Solicitar Cartão',
      description: 'Peça um novo cartão de crédito ou débito',
      color: 'bg-blue-100',
      iconColor: 'text-blue-600',
      onClick: () => alert('Funcionalidade será implementada em breve!')
    },
    {
      icon: Shield,
      title: 'Bloquear Cartão',
      description: 'Bloqueie temporariamente seus cartões',
      color: 'bg-red-100',
      iconColor: 'text-red-600',
      onClick: () => alert('Selecione um cartão para bloquear')
    },
    {
      icon: Download,
      title: 'Fatura',
      description: 'Visualize e baixe suas faturas',
      color: 'bg-green-100',
      iconColor: 'text-green-600',
      onClick: () => alert('Funcionalidade será implementada em breve!')
    }
  ];

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Meus Cartões</h2>
        <div className="flex justify-center py-8">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Meus Cartões</h2>
        <ErrorMessage message={error} onRetry={fetchCards} />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Meus Cartões</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {cards.map((card) => (
          <div key={card.id} className="relative">
            <div className={`rounded-2xl p-6 text-white shadow-lg transform hover:scale-105 transition-all duration-300 ${
              card.tipo === 'credit' ? 'bg-gradient-to-br from-purple-600 to-purple-800' : 'bg-gradient-to-br from-blue-600 to-blue-800'
            }`}>
              <div className="flex justify-between items-start mb-8">
                <div>
                  <p className="text-sm text-white/80 mb-1">{card.nome}</p>
                  <p className="text-lg font-mono">{card.numero}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">{card.bandeira}</p>
                </div>
              </div>
              
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs text-white/60 mb-1">TITULAR</p>
                  <p className="text-sm font-semibold">{user?.name?.toUpperCase()}</p>
                </div>
                <div className="text-right">
                  {card.tipo === 'credit' ? (
                    <div>
                      <p className="text-xs text-white/60">Limite Disponível</p>
                      <p className="text-lg font-bold">
                        R$ {(card.limite - card.usado).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-xs text-white/60">Saldo</p>
                      <p className="text-lg font-bold">
                        R$ {card.saldo?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              
              {card.bloqueado && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded text-xs">
                  BLOQUEADO
                </div>
              )}
            </div>
            
            {!card.bloqueado && (
              <button
                onClick={() => handleBlockCard(card.id)}
                className="absolute bottom-4 right-4 bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600 transition-colors"
              >
                Bloquear
              </button>
            )}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {cardActions.map((action) => {
          const IconComponent = action.icon;
          return (
            <button
              key={action.title}
              onClick={action.onClick}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100"
            >
              <div className={`w-12 h-12 ${action.color} rounded-full flex items-center justify-center mb-4 mx-auto`}>
                <IconComponent className={`w-6 h-6 ${action.iconColor}`} />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{action.title}</h3>
              <p className="text-sm text-gray-600">{action.description}</p>
            </button>
          );
        })}
      </div>
      
      {cards.find(card => card.tipo === 'credit') && (
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Cartão de Crédito - Resumo</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Limite Total</p>
              <p className="text-xl font-bold text-gray-800">
                R$ {cards.find(card => card.tipo === 'credit')?.limite?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Valor Utilizado</p>
              <p className="text-xl font-bold text-red-600">
                R$ {cards.find(card => card.tipo === 'credit')?.usado?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Limite Disponível</p>
              <p className="text-xl font-bold text-green-600">
                R$ {(cards.find(card => card.tipo === 'credit')?.limite - cards.find(card => card.tipo === 'credit')?.usado)?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cards;

