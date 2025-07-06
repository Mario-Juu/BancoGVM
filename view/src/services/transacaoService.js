import api from './api';

export const transacaoService = {
  async listarTransacoes() {
    try {
      const response = await api.get('/transacoes');
      return response.data;
    } catch (error) {
      console.error('Erro ao listar transações:', error);
      throw error;
    }
  },

  async buscarTransacaoPorId(id) {
    try {
      const response = await api.get(`/transacoes/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar transação:', error);
      throw error;
    }
  },

  async criarTransacao(dadosTransacao) {
    try {
      const response = await api.post('/transacoes', dadosTransacao);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar transação:', error);
      throw error;
    }
  },

  async obterExtrato(contaId) {
    try {
      const response = await api.get(`/transacoes/extrato/${contaId}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao obter extrato:', error);
      throw error;
    }
  }
};

