# Banco GVM - Frontend Refatorado

Sistema bancário digital desenvolvido em React com arquitetura modular e integração com backend Spring Boot.

## 🚀 Tecnologias

- **React 19.1.0** - Biblioteca principal
- **React Router DOM** - Roteamento
- **React Hook Form** - Validação de formulários
- **Axios** - Cliente HTTP
- **Tailwind CSS** - Estilização
- **Lucide React** - Ícones
- **Vite** - Build tool

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Layout/         # Componentes de layout
│   └── UI/             # Componentes de interface
├── contexts/           # Contextos React
├── hooks/              # Hooks customizados
├── pages/              # Páginas da aplicação
├── services/           # Serviços de API
├── utils/              # Utilitários
└── assets/             # Recursos estáticos
```

## 🛠️ Instalação e Execução

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone <url-do-repositorio>

# Entre no diretório
cd banco-gvm-refatorado

# Instale as dependências
npm install
```

### Execução
```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

## 🔧 Configuração

### Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

### Backend
Certifique-se de que o backend Spring Boot esteja rodando na porta 8080.

## 📱 Funcionalidades

### ✅ Implementadas
- **Autenticação:** Login/logout com validação
- **Dashboard:** Visão geral da conta e saldo
- **Transferências:** Envio de dinheiro com validação
- **Extrato:** Histórico de transações
- **Cartões:** Visualização e gerenciamento
- **Navegação:** Roteamento protegido
- **Responsividade:** Interface adaptável

### 🔄 Em Desenvolvimento
- Autenticação JWT
- Notificações em tempo real
- Exportação de extratos
- PWA

## 🏗️ Arquitetura

### Componentes
- **Pages:** Componentes de página principais
- **Layout:** Navegação e estrutura
- **UI:** Componentes reutilizáveis (botões, modais, etc.)

### Estado
- **AuthContext:** Gerenciamento de autenticação
- **Custom Hooks:** Lógica específica (useTransactions, useCards)
- **Local State:** Estado específico de componentes

### Serviços
- **API:** Configuração centralizada do Axios
- **Auth:** Serviços de autenticação
- **Business:** Serviços específicos (contas, transações, cartões)

## 🧪 Testes

```bash
# Executar testes
npm run test

# Testes com coverage
npm run test:coverage
```

## 📦 Build e Deploy

```bash
# Build para produção
npm run build

# O build será gerado na pasta 'dist'
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Suporte

Para suporte, entre em contato através do email: suporte@bancogvm.com

---

Desenvolvido com ❤️ pela equipe Banco GVM

