
export const store = {
  // Dados recebidos da API
  clientes: [],
  aparelhos: [],

  // Controle de carregamento
  carregandoClientes: false,
  carregandoAparelhos: false,

  // Controle de erros
  erroClientes: null,
  erroAparelhos: null,

  // Controle de edição
  clienteEditando: null,
  aparelhoEditando: null,

  // Tela selecionada
  telaAtual: 'clientes'
};
