
import { tecnicoService } from '../services/tecnicoService.js';

const $ = id => document.getElementById(id);

let tecnicos = [];
let inicializado = false;


async function carregarTecnicos() {
  try {
    tecnicos = await tecnicoService.listar();
    renderizarTecnicos();
  } catch (erro) {
    alert(`Erro ao carregar técnicos: ${erro.message}`);
  }
}

function renderizarTecnicos() {
  const tbody = $('tecnicos-linhas');
  tbody.replaceChildren();

  if (tecnicos.length === 0) {
    const linha = tbody.insertRow();
    const celula = linha.insertCell();

    celula.colSpan = 5;
    celula.className = 'text-center text-muted py-4';
    celula.textContent = 'Nenhum técnico cadastrado';

    return;
  }

  for (const tecnico of tecnicos) {
    const linha = tbody.insertRow();

    const valores = [
      tecnico.id,
      tecnico.nome,
      tecnico.telefone || '-',
      tecnico.especialidade || '-'
    ];

    for (const valor of valores) {
      linha.insertCell().textContent = valor;
    }

    const acoes = linha.insertCell();

    const editar = document.createElement('button');
    editar.type = 'button';
    editar.className = 'btn btn-sm btn-primary me-2';
    editar.innerHTML = '<i class="bi bi-pencil"></i> Editar';

    editar.addEventListener('click', () => {
      editarTecnico(tecnico.id);
    });

    const excluir = document.createElement('button');
    excluir.type = 'button';
    excluir.className = 'btn btn-sm btn-danger';
    excluir.innerHTML = '<i class="bi bi-trash"></i> Excluir';

    excluir.addEventListener('click', () => {
      excluirTecnico(tecnico.id);
    });

    acoes.append(editar, excluir);
  }
}



function limparFormularioTecnico() {
  $('form-tecnico').reset();
  $('tec-id').value = '';
  $('tec-salvar').innerHTML =
    '<i class="bi bi-check-circle"></i> Salvar Técnico';
}



function editarTecnico(id) {
  const tecnico = tecnicos.find(t => t.id === id);

  if (!tecnico) return;

  $('tec-id').value = tecnico.id;
  $('tec-nome').value = tecnico.nome;
  $('tec-telefone').value = tecnico.telefone || '';
  $('tec-especialidade').value = tecnico.especialidade || '';

  $('tec-salvar').innerHTML =
    '<i class="bi bi-check-circle"></i> Salvar Alterações';

  $('form-tecnico').scrollIntoView({
    behavior: 'smooth'
  });

  $('tec-nome').focus();
}


async function salvarTecnico(evento) {
  evento.preventDefault();

  const id = $('tec-id').value;
  const botao = $('tec-salvar');

  const dados = {
    nome: $('tec-nome').value.trim(),
    telefone: $('tec-telefone').value.trim(),
    especialidade: $('tec-especialidade').value.trim()
  };

  if (!dados.nome) {
    alert('Informe o nome do técnico.');
    return;
  }

  botao.disabled = true;

  try {
    if (id) {
      await tecnicoService.atualizar(Number(id), dados);
      alert('Técnico atualizado com sucesso!');
    } else {
      await tecnicoService.criar(dados);
      alert('Técnico cadastrado com sucesso!');
    }

    limparFormularioTecnico();
    await carregarTecnicos();

  } catch (erro) {
    alert(`Erro ao salvar técnico: ${erro.message}`);

  } finally {
    botao.disabled = false;
  }
}


async function excluirTecnico(id) {
  const tecnico = tecnicos.find(t => t.id === id);

  if (!tecnico) return;

  const confirmar = confirm(
    `Deseja excluir o técnico "${tecnico.nome}"?`
  );

  if (!confirmar) return;

  try {
    await tecnicoService.remover(id);

    if (Number($('tec-id').value) === id) {
      limparFormularioTecnico();
    }

    await carregarTecnicos();

    alert('Técnico excluído com sucesso!');

  } catch (erro) {
    alert(`Erro ao excluir técnico: ${erro.message}`);
  }
}



export function iniciarTelaTecnicos() {
  if (inicializado) return;

  $('form-tecnico').addEventListener(
    'submit',
    salvarTecnico
  );

  $('tec-cancelar').addEventListener(
    'click',
    limparFormularioTecnico
  );

  $('tec-recarregar').addEventListener(
    'click',
    carregarTecnicos
  );

  inicializado = true;
}

export async function abrirTelaTecnicos() {
  await carregarTecnicos();
}
