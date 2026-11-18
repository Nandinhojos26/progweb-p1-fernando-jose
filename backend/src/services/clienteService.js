
import { clienteModel } from '../models/clienteModel.js';
import { erro } from '../utils/erro.js';

export const clienteService = {

  listar() {
    return clienteModel.listar();
  },

  buscarPorId(id) {
    const cliente = clienteModel.buscarPorId(id);

    if (!cliente) {
      throw erro(404, 'Cliente não encontrado');
    }

    return cliente;
  },

  criar({ nome, cpf, telefone, email } = {}) {
    if (!nome || !cpf) {
      throw erro(400, 'Nome e CPF são obrigatórios');
    }

    if (clienteModel.existeCpf(cpf)) {
      throw erro(409, 'CPF já cadastrado');
    }

    return clienteModel.inserir({
      nome,
      cpf,
      telefone,
      email
    });
  },

  atualizar(id, dados = {}) {
    this.buscarPorId(id);

    if (dados.nome === '' || dados.cpf === '') {
      throw erro(400, 'Nome e CPF não podem ficar vazios');
    }

    if (dados.cpf !== undefined) {
      const clientes = clienteModel.listar();

      const duplicado = clientes.some(c =>
        c.cpf === dados.cpf && c.id !== id
      );

      if (duplicado) {
        throw erro(409, 'CPF já cadastrado');
      }
    }

    return clienteModel.atualizar(id, dados);
  },

  remover(id) {
    const removido = clienteModel.remover(id);

    if (!removido) {
      throw erro(404, 'Cliente não encontrado');
    }
  }
};
