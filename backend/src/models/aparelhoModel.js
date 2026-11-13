
let aparelhos = [];
let proximoId = 1;

export const aparelhoModel = {

  listar() {
    return aparelhos;
  },

  buscarPorId(id) {
    return aparelhos.find(a => a.id === id) ?? null;
  },

  listarPorCliente(clienteId) {
    return aparelhos.filter(a => a.clienteId === clienteId);
  },

  existeImei(imei) {
    return aparelhos.some(a => a.imei === imei);
  },

  inserir({ marca, modelo, imei, clienteId }) {
    const novo = {
      id: proximoId++,
      marca,
      modelo,
      imei,
      clienteId
    };

    aparelhos.push(novo);

    return novo;
  },

  atualizar(id, dados) {
    const i = aparelhos.findIndex(a => a.id === id);

    if (i === -1) return null;

    aparelhos[i] = {
      ...aparelhos[i],
      ...dados,
      id
    };

    return aparelhos[i];
  },

  remover(id) {
    const antes = aparelhos.length;

    aparelhos = aparelhos.filter(a => a.id !== id);

    return aparelhos.length < antes;
  }
};
