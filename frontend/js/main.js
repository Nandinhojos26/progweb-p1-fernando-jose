
import { clienteService } from './services/clienteService.js';
import { aparelhoService } from './services/aparelhoService.js';
import { store } from './state/store.js';
import { mostrarAviso, limparAviso } from './ui/aviso.js';
import { renderizarClientes } from './ui/clienteView.js';
import { renderizarAparelhos } from './ui/aparelhoView.js';

// Elementos de navegação
const btnClientes = document.getElementById('btn-clientes');
const btnAparelhos = document.getElementById('btn-aparelhos');
const secaoClientes = document.getElementById('secao-clientes');
const secaoAparelhos = document.getElementById('secao-aparelhos');

// Formulário de clientes
const formCliente = document.getElementById('form-cliente');
const cliNome = document.getElementById('cli-nome');
const cliCpf = document.getElementById('cli-cpf');
const cliTelefone = document.getElementById('cli-telefone');
const cliEmail = document.getElementById('cli-email');
const cliSalvar = document.getElementById('cli-salvar');
const cliCancelar = document.getElementById('cli-cancelar');
const clientesLinhas = document.getElementById('clientes-linhas');

// Formulário de aparelhos
const formAparelho = document.getElementById('form-aparelho');
const apMarca = document.getElementById('ap-marca');
const apModelo = document.getElementById('ap-modelo');
const apImei = document.getElementById('ap-imei');
const apCliente = document.getElementById('ap-cliente');
const apSalvar = document.getElementById('ap-salvar');
const apCancelar = document.getElementById('ap-cancelar');
const aparelhosLinhas = document.getElementById('aparelhos-linhas');

// Navegação entre telas
function mostrarTela(tela) {
  store.telaAtual = tela;

  secaoClientes.classList.toggle('d-none', tela !== 'clientes');
  secaoAparelhos.classList.toggle('d-none', tela !== 'aparelhos');

  btnClientes.classList.toggle('active', tela === 'clientes');
  btnAparelhos.classList.toggle('active', tela === 'aparelhos');

  limparAviso();
}

btnClientes.addEventListener('click', () => mostrarTela('clientes'));
btnAparelhos.addEventListener('click', () => mostrarTela('aparelhos'));

// Atualiza o select de clientes no formulário de aparelhos
function atualizarSelectClientes() {
  const selecionado = apCliente.value;
  apCliente.replaceChildren();

  const inicial = document.createElement('option');
  inicial.value = '';
  inicial.textContent = 'Selecione um cliente';
  apCliente.appendChild(inicial);

  store.clientes.forEach(cliente => {
    const option = document.createElement('option');
    option.value = cliente.id;
    option.textContent = cliente.nome;
    apCliente.appendChild(option);
  });

  apCliente.value = selecionado;
}

// Carregamento de clientes
async function carregarClientes() {
  store.carregandoClientes = true;
  store.erroClientes = null;
  renderizarClientes(store);

  try {
    store.clientes = await clienteService.listar();
    atualizarSelectClientes();
    renderizarAparelhos(store);
  } catch (erro) {
    store.erroClientes = erro.message;
  } finally {
    store.carregandoClientes = false;
    renderizarClientes(store);
  }
}

// Carregamento de aparelhos
async function carregarAparelhos() {
  store.carregandoAparelhos = true;
  store.erroAparelhos = null;
  renderizarAparelhos(store);

  try {
    store.aparelhos = await aparelhoService.listar();
  } catch (erro) {
    store.erroAparelhos = erro.message;
  } finally {
    store.carregandoAparelhos = false;
    renderizarAparelhos(store);
  }
}

// Limpar formulário de clientes
function limparFormularioCliente() {
  formCliente.reset();
  store.clienteEditando = null;
  cliSalvar.textContent = 'Salvar cliente';
  cliCancelar.classList.add('d-none');
}

// Limpar formulário de aparelhos
function limparFormularioAparelho() {
  formAparelho.reset();
  store.aparelhoEditando = null;
  apSalvar.textContent = 'Salvar aparelho';
  apCancelar.classList.add('d-none');
}

// Cadastrar ou editar cliente
formCliente.addEventListener('submit', async evento => {
  evento.preventDefault();
  limparAviso();

  const dados = {
    nome: cliNome.value.trim(),
    cpf: cliCpf.value.trim(),
    telefone: cliTelefone.value.trim(),
    email: cliEmail.value.trim()
  };

  cliSalvar.disabled = true;

  try {
    if (store.clienteEditando !== null) {
      await clienteService.atualizar(store.clienteEditando, dados);
      mostrarAviso('Cliente atualizado com sucesso!');
    } else {
      await clienteService.criar(dados);
      mostrarAviso('Cliente cadastrado com sucesso!');
    }

    limparFormularioCliente();
    await carregarClientes();
  } catch (erro) {
    mostrarAviso(erro.message, 'danger');
  } finally {
    cliSalvar.disabled = false;
  }
});

// Editar ou remover cliente
clientesLinhas.addEventListener('click', async evento => {
  const botao = evento.target.closest('button[data-acao]');
  if (!botao) return;

  const id = Number(botao.dataset.id);
  const cliente = store.clientes.find(c => Number(c.id) === id);
  if (!cliente) return;

  if (botao.dataset.acao === 'editar') {
    store.clienteEditando = id;
    cliNome.value = cliente.nome;
    cliCpf.value = cliente.cpf;
    cliTelefone.value = cliente.telefone;
    cliEmail.value = cliente.email || '';
    cliSalvar.textContent = 'Salvar alterações';
    cliCancelar.classList.remove('d-none');
    cliNome.focus();
    return;
  }

  if (botao.dataset.acao === 'remover') {
    if (!confirm(`Deseja remover o cliente "${cliente.nome}"?`)) return;

    try {
      await clienteService.remover(id);
      if (store.clienteEditando === id) limparFormularioCliente();
      mostrarAviso('Cliente removido com sucesso!');
      await carregarClientes();
      await carregarAparelhos();
    } catch (erro) {
      mostrarAviso(erro.message, 'danger');
    }
  }
});

// Cadastrar ou editar aparelho
formAparelho.addEventListener('submit', async evento => {
  evento.preventDefault();
  limparAviso();

  const dados = {
    marca: apMarca.value.trim(),
    modelo: apModelo.value.trim(),
    imei: apImei.value.trim(),
    clienteId: Number(apCliente.value)
  };

  apSalvar.disabled = true;

  try {
    if (store.aparelhoEditando !== null) {
      await aparelhoService.atualizar(store.aparelhoEditando, dados);
      mostrarAviso('Aparelho atualizado com sucesso!');
    } else {
      await aparelhoService.criar(dados);
      mostrarAviso('Aparelho cadastrado com sucesso!');
    }

    limparFormularioAparelho();
    await carregarAparelhos();
  } catch (erro) {
    mostrarAviso(erro.message, 'danger');
  } finally {
    apSalvar.disabled = false;
  }
});

// Editar ou remover aparelho
aparelhosLinhas.addEventListener('click', async evento => {
  const botao = evento.target.closest('button[data-acao]');
  if (!botao) return;

  const id = Number(botao.dataset.id);
  const aparelho = store.aparelhos.find(a => Number(a.id) === id);
  if (!aparelho) return;

  if (botao.dataset.acao === 'editar') {
    store.aparelhoEditando = id;
    apMarca.value = aparelho.marca;
    apModelo.value = aparelho.modelo;
    apImei.value = aparelho.imei;
    apCliente.value = aparelho.clienteId;
    apSalvar.textContent = 'Salvar alterações';
    apCancelar.classList.remove('d-none');
    apMarca.focus();
    return;
  }

  if (botao.dataset.acao === 'remover') {
    if (!confirm(`Deseja remover o aparelho "${aparelho.modelo}"?`)) return;

    try {
      await aparelhoService.remover(id);
      if (store.aparelhoEditando === id) limparFormularioAparelho();
      mostrarAviso('Aparelho removido com sucesso!');
      await carregarAparelhos();
    } catch (erro) {
      mostrarAviso(erro.message, 'danger');
    }
  }
});

// Botões cancelar
cliCancelar.addEventListener('click', limparFormularioCliente);
apCancelar.addEventListener('click', limparFormularioAparelho);

// Botões atualizar
document.getElementById('clientes-recarregar')
  .addEventListener('click', carregarClientes);

document.getElementById('aparelhos-recarregar')
  .addEventListener('click', carregarAparelhos);

// Inicialização
async function iniciar() {
  await carregarClientes();
  await carregarAparelhos();
}

iniciar();
