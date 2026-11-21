
import { api } from '../api.js';

export const aparelhoService = {
  listar() {
    return api.get('/aparelhos');
  },

  buscarPorId(id) {
    return api.get(`/aparelhos/${id}`);
  },

  listarPorCliente(clienteId) {
    return api.get(`/aparelhos?clienteId=${clienteId}`);
  },

  criar(dados) {
    return api.post('/aparelhos', dados);
  },

  atualizar(id, dados) {
    return api.put(`/aparelhos/${id}`, dados);
  },

  remover(id) {
    return api.delete(`/aparelhos/${id}`);
  }
};
