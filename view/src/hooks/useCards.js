import { useState, useEffect } from 'react';
import { cartaoService } from '../services/cartaoService';

export const useCards = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCards = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await cartaoService.listarCartoes();
      setCards(data);
    } catch (err) {
      setError(err.message);
      // Fallback para dados mock em caso de erro
      setCards([
        { 
          id: 1, 
          tipo: 'credit', 
          numero: '**** **** **** 1234', 
          nome: 'Cartão de Crédito', 
          limite: 5000, 
          usado: 1200, 
          bandeira: 'Visa' 
        },
        { 
          id: 2, 
          tipo: 'debit', 
          numero: '**** **** **** 5678', 
          nome: 'Cartão de Débito', 
          saldo: 2850.75, 
          bandeira: 'Mastercard' 
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const createCard = async (cardData) => {
    setLoading(true);
    setError(null);
    try {
      const newCard = await cartaoService.criarCartao(cardData);
      setCards(prev => [...prev, newCard]);
      return newCard;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const blockCard = async (cardId) => {
    setLoading(true);
    setError(null);
    try {
      await cartaoService.bloquearCartao(cardId);
      setCards(prev => prev.map(card => 
        card.id === cardId ? { ...card, bloqueado: true } : card
      ));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const unblockCard = async (cardId) => {
    setLoading(true);
    setError(null);
    try {
      await cartaoService.desbloquearCartao(cardId);
      setCards(prev => prev.map(card => 
        card.id === cardId ? { ...card, bloqueado: false } : card
      ));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  return {
    cards,
    loading,
    error,
    fetchCards,
    createCard,
    blockCard,
    unblockCard
  };
};

