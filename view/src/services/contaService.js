import api from './api';

export const contaService = {
  async listarContas() {
    try {
      const response = await api.get('/contas');
      return response.data;
    } catch (error) {
      console.error('Erro ao listar contas:', error);
      throw error;
    }
  },

  async buscarContaPorId(id) {
    try {
      const response = await api.get(`/contas/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar conta:', error);
      throw error;
    }
  },

  async criarContaCorrente(dadosConta) {
    try {
      const response = await api.post('/contas/corrente', dadosConta);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar conta corrente:', error);
      throw error;
    }
  },

  async criarContaPoupanca(dadosConta) {
    try {
      const response = await api.post('/contas/poupanca', dadosConta);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar conta poupança:', error);
      throw error;
    }
  }
};

