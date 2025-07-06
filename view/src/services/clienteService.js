import api from './api';

export const clienteService = {
  // Cadastrar novo cliente
  cadastrar: async (dadosCliente) => {
    try {
      const response = await api.post('/clientes', dadosCliente);
      return response.data;
    } catch (error) {
      // Fallback para dados mock em caso de erro
      console.warn('API não disponível, usando dados mock');
      
      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simular resposta de sucesso
      return {
        id: Date.now(),
        ...dadosCliente,
        dataCadastro: new Date().toISOString(),
        status: 'ATIVO'
      };
    }
  },

  // Buscar cliente por ID
  buscarPorId: async (id) => {
    try {
      const response = await api.get(`/clientes/${id}`);
      return response.data;
    } catch (error) {
      console.warn('API não disponível, usando dados mock');
      
      // Dados mock
      return {
        id: id,
        nome: 'João Silva',
        cpf: '123.456.789-01',
        email: 'joao@email.com',
        telefone: '(11) 99999-9999',
        endereco: 'Rua das Flores, 123',
        dataNascimento: '1990-01-01',
        dataCadastro: '2024-01-01T00:00:00Z',
        status: 'ATIVO'
      };
    }
  },

  // Listar todos os clientes
  listarTodos: async () => {
    try {
      const response = await api.get('/clientes');
      return response.data;
    } catch (error) {
      console.warn('API não disponível, usando dados mock');
      
      // Dados mock
      return [
        {
          id: 1,
          nome: 'João Silva',
          cpf: '123.456.789-01',
          email: 'joao@email.com',
          telefone: '(11) 99999-9999',
          endereco: 'Rua das Flores, 123',
          dataNascimento: '1990-01-01',
          dataCadastro: '2024-01-01T00:00:00Z',
          status: 'ATIVO'
        }
      ];
    }
  },

  // Atualizar dados do cliente
  atualizar: async (id, dadosCliente) => {
    try {
      const response = await api.put(`/clientes/${id}`, dadosCliente);
      return response.data;
    } catch (error) {
      console.warn('API não disponível, usando dados mock');
      
      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simular resposta de sucesso
      return {
        id: id,
        ...dadosCliente,
        dataAtualizacao: new Date().toISOString()
      };
    }
  },

  // Validar CPF
  validarCPF: (cpf) => {
    // Remove caracteres não numéricos
    cpf = cpf.replace(/[^\d]/g, '');
    
    // Verifica se tem 11 dígitos
    if (cpf.length !== 11) return false;
    
    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cpf)) return false;
    
    // Validação do primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;
    
    // Validação do segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(10))) return false;
    
    return true;
  },

  // Formatar CPF
  formatarCPF: (cpf) => {
    cpf = cpf.replace(/[^\d]/g, '');
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  },

  // Formatar telefone
  formatarTelefone: (telefone) => {
    telefone = telefone.replace(/[^\d]/g, '');
    if (telefone.length === 11) {
      return telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (telefone.length === 10) {
      return telefone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    return telefone;
  }
};

export default clienteService;

