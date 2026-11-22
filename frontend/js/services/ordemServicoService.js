
import { api } from '../api.js';

export const ordemServicoService = {
  listar() {
    return api.get('/ordens-servico');
  },

  buscarPorId(id) {
    return api.get(`/ordens-servico/${id}`);
  },

  criar(dados) {
    return api.post('/ordens-servico', dados);
  },

  atualizar(id, dados) {
    return api.put(`/ordens-servico/${id}`, dados);
  },

  remover(id) {
    return api.delete(`/ordens-servico/${id}`);
  }
};
