
let registros = [];
let sequencia = 1;

export const tecnicoModel = {
  listar: () => [...registros],

  buscarPorId: (id) =>
    registros.find(t => t.id === id) ?? null,

  criar: (dados) => {
    const novo = {
      id: sequencia++,
      ...dados
    };

    registros.push(novo);
    return novo;
  },

  atualizar: (id, dados) => {
    const i = registros.findIndex(t => t.id === id);

    if (i < 0) return null;

    registros[i] = {
      ...registros[i],
      ...dados,
      id
    };

    return registros[i];
  },

  remover: (id) => {
    const i = registros.findIndex(t => t.id === id);

    if (i < 0) return false;

    registros.splice(i, 1);
    return true;
  }
};
