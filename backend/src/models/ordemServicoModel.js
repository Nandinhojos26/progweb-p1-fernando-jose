
let ordens = [];
let proximoId = 1;

export const ordemServicoModel = {

  listar() {
    return [...ordens];
  },

  buscarPorId(id) {
    return ordens.find(os => os.id === id) ?? null;
  },

  listarPorAparelho(aparelhoId) {
    return ordens.filter(
      os => os.aparelhoId === aparelhoId
    );
  },

  listarPorTecnico(tecnicoId) {
    return ordens.filter(
      os => os.tecnicoId === tecnicoId
    );
  },

  inserir(dados) {
    const novaOS = {
      id: proximoId++,
      ...dados,
      dataEntrada: new Date().toISOString(),
      dataConclusao: null
    };

    ordens.push(novaOS);
    return novaOS;
  },

  atualizar(id, dados) {
    const indice = ordens.findIndex(
      os => os.id === id
    );

    if (indice === -1) return null;

    ordens[indice] = {
      ...ordens[indice],
      ...dados,
      id
    };

    return ordens[indice];
  },

  remover(id) {
    const quantidadeAnterior = ordens.length;

    ordens = ordens.filter(os => os.id !== id);

    return ordens.length < quantidadeAnterior;
  }
};
