
import { api } from '../api.js';

export const clienteService = {
  listar() {
    return api.get('/clientes');
  },

  buscarPorId(id) {
    return api.get(`/clientes/${id}`);
  },

  criar(dados) {
    return api.post('/clientes', dados);
  },

  atualizar(id, dados) {
    return api.put(`/clientes/${id}`, dados);
  },

  remover(id) {
    return api.delete(`/clientes/${id}`);
  }
};
