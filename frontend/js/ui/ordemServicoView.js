import { clienteService } from '../services/clienteService.js';
import { imprimirOS } from './impressaoOS.js'
import { ordemServicoService } from '../services/ordemServicoService.js';
import { tecnicoService } from '../services/tecnicoService.js';
import { aparelhoService } from '../services/aparelhoService.js';

const $ = id => document.getElementById(id);

let ordens = [];
let aparelhos = [];
let tecnicos = [];
let clientes = [];

function moeda(valor) {
  return Number(valor).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}

function texto(valor) {
  return String(valor ?? '');
}

function preencherSelect(id, itens, descricao, vazio) {
  const select = $(id);
  select.replaceChildren(new Option(vazio, ''));

  for (const item of itens) {
    select.add(new Option(descricao(item), item.id));
  }
}


async function carregarDados() {
  try {
    [ordens, aparelhos, tecnicos, clientes] =
      await Promise.all([
        ordemServicoService.listar(),
        aparelhoService.listar(),
        tecnicoService.listar(),
        clienteService.listar()
      ]);

    preencherSelect(
      'os-aparelho',
      aparelhos,
      a => `${a.marca} ${a.modelo} - ID ${a.id}`,
      'Selecione um aparelho'
    );

    preencherSelect(
      'os-tecnico',
      tecnicos,
      t => t.nome,
      'Não atribuído'
    );

    renderizarTabela();

  } catch (erro) {
    alert(`Erro ao carregar OS: ${erro.message}`);
  }
}


function imprimirOrdem(id) {
  const os = ordens.find(
    item => Number(item.id) === Number(id)
  );

  if (!os) {
    alert('Ordem de Serviço não encontrada.');
    return;
  }

  const aparelho = aparelhos.find(
    item => Number(item.id) === Number(os.aparelhoId)
  );

  const cliente = clientes.find(
    item => Number(item.id) === Number(aparelho?.clienteId)
  );

  const tecnico = tecnicos.find(
    item => Number(item.id) === Number(os.tecnicoId)
  );

  imprimirOS(os, aparelho, cliente, tecnico);
}



function renderizarTabela() {
  const tbody = $('os-linhas');
  tbody.replaceChildren();

  if (ordens.length === 0) {
    const linha = tbody.insertRow();
    const celula = linha.insertCell();
    celula.colSpan = 6;
    celula.className = 'text-center text-muted';
    celula.textContent = 'Nenhuma OS cadastrada';
    return;
  }

  for (const os of ordens) {
    const aparelho = aparelhos.find(
      a => a.id === os.aparelhoId
    );

    const linha = tbody.insertRow();

    const valores = [
      `#${os.id}`,
      aparelho
        ? `${aparelho.marca} ${aparelho.modelo}`
        : `Aparelho #${os.aparelhoId}`,
      moeda(os.valorOrcamento),
      os.aprovacao.replaceAll('_', ' '),
      os.status.replaceAll('_', ' ')
    ];

    for (const valor of valores) {
      linha.insertCell().textContent = valor;
    }

    const acoes = linha.insertCell();

    const editar = document.createElement('button');
    editar.className = 'btn btn-sm btn-primary me-1';
    editar.textContent = 'Editar';
    editar.addEventListener('click', () => editarOS(os.id));

    const excluir = document.createElement('button');
    excluir.className = 'btn btn-sm btn-danger';
    excluir.textContent = 'Excluir';
    excluir.addEventListener('click', () => excluirOS(os.id));

    
const imprimir = document.createElement('button');

imprimir.type = 'button';
imprimir.className = 'btn btn-sm btn-success me-1';
imprimir.innerHTML =
  '<i class="bi bi-printer"></i> Imprimir';

imprimir.addEventListener('click', () => {
  imprimirOrdem(os.id);
});

acoes.append(editar, imprimir, excluir);

  }
}

function limparFormulario() {
  $('form-os').reset();
  $('os-id').value = '';
  $('os-aparelho').disabled = false;
  $('os-status').value = 'aberta';
  $('os-aprovacao').value = 'em_orcamento';
}

function editarOS(id) {
  const os = ordens.find(item => item.id === id);
  if (!os) return;

  $('os-id').value = os.id;
  $('os-aparelho').value = os.aparelhoId;
  $('os-aparelho').disabled = true;
  $('os-tecnico').value = os.tecnicoId ?? '';
  $('os-problema').value = os.descricaoProblema;
  $('os-valor').value = os.valorOrcamento;
  $('os-garantia').value = os.garantia;
  $('os-aprovacao').value = os.aprovacao;
  $('os-status').value = os.status;

  $('form-os').scrollIntoView({
    behavior: 'smooth'
  });
}

async function salvarOS(evento) {
  evento.preventDefault();

  const id = $('os-id').value;

  const dados = {
    tecnicoId: $('os-tecnico').value
      ? Number($('os-tecnico').value)
      : null,
    descricaoProblema: $('os-problema').value.trim(),
    valorOrcamento: Number($('os-valor').value),
    aprovacao: $('os-aprovacao').value,
    garantia: Number($('os-garantia').value)
  };

  try {
    if (id) {
      dados.status = $('os-status').value;

      await ordemServicoService.atualizar(
        Number(id),
        dados
      );
    } else {
      dados.aparelhoId = Number($('os-aparelho').value);

      await ordemServicoService.criar(dados);
    }

    limparFormulario();
    await carregarDados();

    alert('Ordem de Serviço salva com sucesso!');
  } catch (erro) {
    alert(`Erro ao salvar: ${erro.message}`);
  }
}

async function excluirOS(id) {
  if (!confirm(`Deseja excluir a OS #${id}?`)) {
    return;
  }

  try {
    await ordemServicoService.remover(id);
    limparFormulario();
    await carregarDados();
  } catch (erro) {
    alert(`Erro ao excluir: ${erro.message}`);
  }
}

export function iniciarTelaOS() {
  $('form-os').addEventListener('submit', salvarOS);
  $('os-cancelar').addEventListener('click', limparFormulario);
  $('os-recarregar').addEventListener('click', carregarDados);
}

export async function abrirTelaOS() {
  await carregarDados();
}
