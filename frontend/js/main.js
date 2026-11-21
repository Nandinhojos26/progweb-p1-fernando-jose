
import { clienteService } from './services/clienteService.js';
import { aparelhoService } from './services/aparelhoService.js';

import { store } from './state/store.js';

import {
  mostrarAviso,
  limparAviso
} from './ui/aviso.js';

import { renderizarClientes } from './ui/clienteView.js';
import { renderizarAparelhos } from './ui/aparelhoView.js';

import {
  iniciarTelaTecnicos,
  abrirTelaTecnicos
} from './ui/tecnicoView.js';

import {
  iniciarTelaOS,
  abrirTelaOS
} from './ui/ordemServicoView.js';



const btnClientes = document.getElementById('btn-clientes');
const btnAparelhos = document.getElementById('btn-aparelhos');
const btnTecnicos = document.getElementById('btn-tecnicos');
const btnOrdens = document.getElementById('btn-ordens');

const secaoClientes = document.getElementById('secao-clientes');
const secaoAparelhos = document.getElementById('secao-aparelhos');
const secaoTecnicos = document.getElementById('secao-tecnicos');
const secaoOrdens = document.getElementById('secao-ordens');


const formCliente = document.getElementById('form-cliente');

const cliNome = document.getElementById('cli-nome');
const cliCpf = document.getElementById('cli-cpf');
const cliTelefone = document.getElementById('cli-telefone');
const cliEmail = document.getElementById('cli-email');

const cliSalvar = document.getElementById('cli-salvar');
const cliCancelar = document.getElementById('cli-cancelar');

const clientesLinhas = document.getElementById('clientes-linhas');


const formAparelho = document.getElementById('form-aparelho');

const apMarca = document.getElementById('ap-marca');
const apModelo = document.getElementById('ap-modelo');
const apImei = document.getElementById('ap-imei');
const apCliente = document.getElementById('ap-cliente');

const apSalvar = document.getElementById('ap-salvar');
const apCancelar = document.getElementById('ap-cancelar');

const aparelhosLinhas = document.getElementById('aparelhos-linhas');

function mostrarTela(tela) {
  store.telaAtual = tela;

  secaoClientes.classList.toggle(
    'd-none',
    tela !== 'clientes'
  );

  secaoAparelhos.classList.toggle(
    'd-none',
    tela !== 'aparelhos'
  );

  secaoTecnicos.classList.toggle(
    'd-none',
    tela !== 'tecnicos'
  );

  secaoOrdens.classList.toggle(
    'd-none',
    tela !== 'ordens'
  );

  btnClientes.classList.toggle(
    'active',
    tela === 'clientes'
  );

  btnAparelhos.classList.toggle(
    'active',
    tela === 'aparelhos'
  );

  btnTecnicos.classList.toggle(
    'active',
    tela === 'tecnicos'
  );

  btnOrdens.classList.toggle(
    'active',
    tela === 'ordens'
  );

  limparAviso();
}


btnClientes.addEventListener('click', () => {
  mostrarTela('clientes');
  carregarClientes();
});

btnAparelhos.addEventListener('click', async () => {
  mostrarTela('aparelhos');

  await carregarClientes();
  await carregarAparelhos();
});

btnTecnicos.addEventListener('click', async () => {
  mostrarTela('tecnicos');
  await abrirTelaTecnicos();
});

btnOrdens.addEventListener('click', async () => {
  mostrarTela('ordens');
  await abrirTelaOS();
});


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

  if (
    [...apCliente.options].some(
      option => option.value === selecionado
    )
  ) {
    apCliente.value = selecionado;
  }
}


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

function limparFormularioCliente() {
  formCliente.reset();

  store.clienteEditando = null;

  cliSalvar.textContent = 'Salvar cliente';
  cliCancelar.classList.add('d-none');
}


function limparFormularioAparelho() {
  formAparelho.reset();

  store.aparelhoEditando = null;

  apSalvar.textContent = 'Salvar aparelho';
  apCancelar.classList.add('d-none');
}


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
      await clienteService.atualizar(
        store.clienteEditando,
        dados
      );

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


clientesLinhas.addEventListener('click', async evento => {
  const botao = evento.target.closest('button[data-acao]');

  if (!botao) return;

  const id = Number(botao.dataset.id);

  const cliente = store.clientes.find(
    c => Number(c.id) === id
  );

  if (!cliente) return;

  // EDITAR CLIENTE
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

  // REMOVER CLIENTE
  if (botao.dataset.acao === 'remover') {
    const confirmar = confirm(
      `Deseja remover o cliente "${cliente.nome}"?`
    );

    if (!confirmar) return;

    try {
      await clienteService.remover(id);

      if (store.clienteEditando === id) {
        limparFormularioCliente();
      }

      mostrarAviso('Cliente removido com sucesso!');

      await carregarClientes();
      await carregarAparelhos();

    } catch (erro) {
      mostrarAviso(erro.message, 'danger');
    }
  }
});


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
      await aparelhoService.atualizar(
        store.aparelhoEditando,
        dados
      );

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


aparelhosLinhas.addEventListener('click', async evento => {
  const botao = evento.target.closest('button[data-acao]');

  if (!botao) return;

  const id = Number(botao.dataset.id);

  const aparelho = store.aparelhos.find(
    a => Number(a.id) === id
  );

  if (!aparelho) return;

  // EDITAR APARELHO
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

  // REMOVER APARELHO
  if (botao.dataset.acao === 'remover') {
    const confirmar = confirm(
      `Deseja remover o aparelho "${aparelho.modelo}"?`
    );

    if (!confirmar) return;

    try {
      await aparelhoService.remover(id);

      if (store.aparelhoEditando === id) {
        limparFormularioAparelho();
      }

      mostrarAviso('Aparelho removido com sucesso!');

      await carregarAparelhos();

    } catch (erro) {
      mostrarAviso(erro.message, 'danger');
    }
  }
});

cliCancelar.addEventListener(
  'click',
  limparFormularioCliente
);

apCancelar.addEventListener(
  'click',
  limparFormularioAparelho
);


document.getElementById('clientes-recarregar')
  .addEventListener('click', carregarClientes);

document.getElementById('aparelhos-recarregar')
  .addEventListener('click', carregarAparelhos);


iniciarTelaTecnicos();
iniciarTelaOS();


async function iniciar() {
  mostrarTela('clientes');

  await carregarClientes();
  await carregarAparelhos();
}

iniciar();
