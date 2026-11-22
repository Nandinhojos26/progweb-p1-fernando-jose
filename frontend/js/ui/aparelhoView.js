
const carregando = document.getElementById('aparelhos-carregando');
const erro = document.getElementById('aparelhos-erro');
const erroMsg = document.getElementById('aparelhos-erro-msg');
const vazio = document.getElementById('aparelhos-vazio');
const sucesso = document.getElementById('aparelhos-sucesso');
const linhas = document.getElementById('aparelhos-linhas');

function mostrarEstado(estado) {
  carregando.classList.toggle('d-none', estado !== 'carregando');
  erro.classList.toggle('d-none', estado !== 'erro');
  vazio.classList.toggle('d-none', estado !== 'vazio');
  sucesso.classList.toggle('d-none', estado !== 'sucesso');
}

export function renderizarAparelhos(store) {
  if (store.carregandoAparelhos) {
    mostrarEstado('carregando');
    return;
  }

  if (store.erroAparelhos) {
    erroMsg.textContent = store.erroAparelhos;
    mostrarEstado('erro');
    return;
  }

  if (store.aparelhos.length === 0) {
    linhas.replaceChildren();
    mostrarEstado('vazio');
    return;
  }

  linhas.replaceChildren();

  store.aparelhos.forEach(aparelho => {
    const tr = document.createElement('tr');

    const cliente = store.clientes.find(
      c => Number(c.id) === Number(aparelho.clienteId)
    );

    const valores = [
      aparelho.id,
      aparelho.marca,
      aparelho.modelo,
      aparelho.imei,
      cliente?.nome || 'Não identificado'
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
    editar.dataset.id = aparelho.id;

    const remover = document.createElement('button');
    remover.type = 'button';
    remover.className = 'btn btn-sm btn-outline-danger';
    remover.textContent = 'Remover';
    remover.dataset.acao = 'remover';
    remover.dataset.id = aparelho.id;

    acoes.append(editar, remover);
    tr.appendChild(acoes);
    linhas.appendChild(tr);
  });

  mostrarEstado('sucesso');
}
