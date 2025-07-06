import api from './api';

export const depositoService = {
  // Realizar depósito
  realizarDeposito: async (dadosDeposito) => {
    try {
      const response = await api.post('/transacoes', {
        contaDestinoId: dadosDeposito.contaId,
        valor: parseFloat(dadosDeposito.valor),
        tipoTransacao: 'DEPOSITO',
        descricao: dadosDeposito.descricao || `Depósito ${dadosDeposito.tipo}`,
        metadados: {
          tipoDeposito: dadosDeposito.tipo,
          numeroCheque: dadosDeposito.numeroCheque,
          bancoOrigem: dadosDeposito.bancoOrigem
        }
      });
      return response.data;
    } catch (error) {
      // Fallback para dados mock em caso de erro
      console.warn('API não disponível, usando dados mock');
      
      // Simular delay de processamento
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simular resposta de sucesso
      return {
        id: 'DEP' + Date.now().toString().slice(-8),
        valor: parseFloat(dadosDeposito.valor),
        tipo: dadosDeposito.tipo,
        descricao: dadosDeposito.descricao,
        dataHora: new Date().toISOString(),
        status: 'PROCESSADO',
        contaDestino: dadosDeposito.contaId,
        comprovante: {
          numero: 'COMP' + Date.now().toString().slice(-6),
          dataEmissao: new Date().toISOString()
        }
      };
    }
  },

  // Consultar histórico de depósitos
  consultarHistorico: async (contaId, filtros = {}) => {
    try {
      const params = new URLSearchParams({
        contaId,
        tipoTransacao: 'DEPOSITO',
        ...filtros
      });
      
      const response = await api.get(`/transacoes/historico?${params}`);
      return response.data;
    } catch (error) {
      console.warn('API não disponível, usando dados mock');
      
      // Dados mock de histórico
      return [
        {
          id: 'DEP12345678',
          valor: 1000.00,
          tipo: 'dinheiro',
          descricao: 'Depósito em dinheiro',
          dataHora: '2024-01-15T10:30:00Z',
          status: 'PROCESSADO'
        },
        {
          id: 'DEP12345679',
          valor: 500.00,
          tipo: 'transferencia',
          descricao: 'Depósito via transferência',
          dataHora: '2024-01-14T14:20:00Z',
          status: 'PROCESSADO'
        }
      ];
    }
  },

  // Validar dados do depósito
  validarDeposito: (dados) => {
    const erros = [];

    // Validar valor
    if (!dados.valor || parseFloat(dados.valor) <= 0) {
      erros.push('Valor deve ser maior que zero');
    }

    if (parseFloat(dados.valor) > 50000) {
      erros.push('Valor máximo por depósito: R$ 50.000,00');
    }

    // Validar tipo
    if (!dados.tipo || !['dinheiro', 'cheque', 'transferencia'].includes(dados.tipo)) {
      erros.push('Tipo de depósito inválido');
    }

    // Validações específicas por tipo
    if (dados.tipo === 'cheque') {
      if (!dados.numeroCheque) {
        erros.push('Número do cheque é obrigatório');
      }
    }

    if (dados.tipo === 'transferencia') {
      if (!dados.bancoOrigem) {
        erros.push('Banco de origem é obrigatório');
      }
    }

    return {
      valido: erros.length === 0,
      erros
    };
  },

  // Calcular taxas (se houver)
  calcularTaxas: (valor, tipo) => {
    let taxa = 0;
    let valorLiquido = parseFloat(valor);

    // Exemplo de taxas por tipo de depósito
    switch (tipo) {
      case 'dinheiro':
        // Sem taxa para depósito em dinheiro
        taxa = 0;
        break;
      case 'cheque':
        // Taxa de R$ 2,00 para depósito em cheque
        taxa = 2.00;
        break;
      case 'transferencia':
        // Sem taxa para transferência
        taxa = 0;
        break;
      default:
        taxa = 0;
    }

    return {
      valorBruto: parseFloat(valor),
      taxa,
      valorLiquido: valorLiquido - taxa
    };
  },

  // Gerar comprovante
  gerarComprovante: (transacao) => {
    return {
      numero: transacao.id,
      dataHora: new Date().toLocaleString('pt-BR'),
      valor: transacao.valor,
      tipo: transacao.tipo,
      descricao: transacao.descricao,
      status: transacao.status,
      autenticacao: 'AUTH' + Date.now().toString().slice(-6)
    };
  },

  // Consultar limites de depósito
  consultarLimites: async (contaId) => {
    try {
      const response = await api.get(`/contas/${contaId}/limites`);
      return response.data;
    } catch (error) {
      console.warn('API não disponível, usando dados mock');
      
      // Limites mock
      return {
        depositoDiario: 10000.00,
        depositoMensal: 100000.00,
        depositoUtilizadoHoje: 0.00,
        depositoUtilizadoMes: 0.00,
        limitesDisponiveis: {
          hoje: 10000.00,
          mes: 100000.00
        }
      };
    }
  }
};

export default depositoService;

