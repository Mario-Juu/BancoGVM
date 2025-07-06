import api from './api';

export const cartaoService = {
  async listarCartoes() {
    try {
      const response = await api.get('/cartoes');
      return response.data;
    } catch (error) {
      console.error('Erro ao listar cartões:', error);
      throw error;
    }
  },

  async buscarCartaoPorId(id) {
    try {
      const response = await api.get(`/cartoes/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar cartão:', error);
      throw error;
    }
  },

  async criarCartao(dadosCartao) {
    try {
      const response = await api.post('/cartoes', dadosCartao);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar cartão:', error);
      throw error;
    }
  },

  async bloquearCartao(id) {
    try {
      const response = await api.put(`/cartoes/${id}/bloquear`);
      return response.data;
    } catch (error) {
      console.error('Erro ao bloquear cartão:', error);
      throw error;
    }
  },

  async desbloquearCartao(id) {
    try {
      const response = await api.put(`/cartoes/${id}/desbloquear`);
      return response.data;
    } catch (error) {
      console.error('Erro ao desbloquear cartão:', error);
      throw error;
    }
  }
};

