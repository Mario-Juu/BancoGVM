import api from './api';

export const authService = {
  // Simular login (já que não há endpoint de auth no backend ainda)
  async login(email, password) {
    try {
      // Por enquanto, simular login bem-sucedido
      // Em produção, isso seria uma chamada real para o backend
      const mockUser = {
        id: 1,
        name: 'João Silva',
        email: email,
        accountNumber: '12345-6',
        balance: 2850.75,
        accountType: 'Conta Corrente'
      };
      
      const mockToken = 'mock-jwt-token-' + Date.now();
      
      localStorage.setItem('authToken', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      return { user: mockUser, token: mockToken };
    } catch (error) {
      throw new Error('Erro ao fazer login');
    }
  },

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated() {
    return !!localStorage.getItem('authToken');
  }
};

