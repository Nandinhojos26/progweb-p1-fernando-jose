
const carregando = document.getElementById('clientes-carregando');
const erro = document.getElementById('clientes-erro');
const erroMsg = document.getElementById('clientes-erro-msg');
const vazio = document.getElementById('clientes-vazio');
const sucesso = document.getElementById('clientes-sucesso');
const linhas = document.getElementById('clientes-linhas');

function mostrarEstado(estado) {
  carregando.classList.toggle('d-none', estado !== 'carregando');
  erro.classList.toggle('d-none', estado !== 'erro');
  vazio.classList.toggle('d-none', estado !== 'vazio');
  sucesso.classList.toggle('d-none', estado !== 'sucesso');
}

export function renderizarClientes(store) {
  if (store.carregandoClientes) {
    mostrarEstado('carregando');
    return;
  }

  if (store.erroClientes) {
    erroMsg.textContent = store.erroClientes;
    mostrarEstado('erro');
    return;
  }

  if (store.clientes.length === 0) {
    linhas.replaceChildren();
    mostrarEstado('vazio');
    return;
  }

  linhas.replaceChildren();

  store.clientes.forEach(cliente => {
    const tr = document.createElement('tr');

    const valores = [
      cliente.id,
      cliente.nome,
      cliente.cpf,
      cliente.telefone,
      cliente.email || '—'
    ];

    valores.forEach(valor => {
      const td = document.createElement('td');
      td.textContent = valor ?? '';
      tr.appendChild(td);
    });

    const acoes = document.createElement('td');

    const editar = document.createElement('button');
    editar.type = 'button';
    editar.className = 'btn btn-sm btn-outline-primary me-2';
    editar.textContent = 'Editar';
    editar.dataset.acao = 'editar';
    editar.dataset.id = cliente.id;

    const remover = document.createElement('button');
    remover.type = 'button';
    remover.className = 'btn btn-sm btn-outline-danger';
    remover.textContent = 'Remover';
    remover.dataset.acao = 'remover';
    remover.dataset.id = cliente.id;

    acoes.append(editar, remover);
    tr.appendChild(acoes);
    linhas.appendChild(tr);
  });

  mostrarEstado('sucesso');
}
