
import { api } from '../api.js';

export const tecnicoService = {
  listar() {
    return api.get('/tecnicos');
  },

  criar(dados) {
    return api.post('/tecnicos', dados);
  },

  atualizar(id, dados) {
    return api.put(`/tecnicos/${id}`, dados);
  },

  remover(id) {
    return api.delete(`/tecnicos/${id}`);
  }
};
