
import { aparelhoModel } from '../models/aparelhoModel.js';
import { clienteModel } from '../models/clienteModel.js';
import { erro } from '../utils/erro.js';

export const aparelhoService = {

  listar(clienteId) {
    if (clienteId !== undefined) {
      return aparelhoModel.listarPorCliente(clienteId);
    }

    return aparelhoModel.listar();
  },

  buscarPorId(id) {
    const aparelho = aparelhoModel.buscarPorId(id);

    if (!aparelho) {
      throw erro(404, 'Aparelho não encontrado');
    }

    return aparelho;
  },

  criar({ marca, modelo, imei, clienteId } = {}) {
    if (!marca || !modelo || !imei || !clienteId) {
      throw erro(400, 'Todos os campos são obrigatórios');
    }

    if (!Number.isInteger(clienteId) || clienteId <= 0) {
      throw erro(400, 'clienteId deve ser um inteiro positivo');
    }

    if (!clienteModel.buscarPorId(clienteId)) {
      throw erro(422, 'Cliente não existe');
    }

    if (aparelhoModel.existeImei(imei)) {
      throw erro(409, 'IMEI já cadastrado');
    }

    return aparelhoModel.inserir({
      marca,
      modelo,
      imei,
      clienteId
    });
  },

  atualizar(id, dados = {}) {
    this.buscarPorId(id);

    if (
      dados.marca === '' ||
      dados.modelo === '' ||
      dados.imei === ''
    ) {
      throw erro(400, 'Campos não podem ficar vazios');
    }

    if (dados.clienteId !== undefined) {
      if (
        !Number.isInteger(dados.clienteId) ||
        dados.clienteId <= 0
      ) {
        throw erro(400, 'clienteId inválido');
      }

      if (!clienteModel.buscarPorId(dados.clienteId)) {
        throw erro(422, 'Cliente não existe');
      }
    }

    if (dados.imei !== undefined) {
      const duplicado = aparelhoModel.listar().some(a =>
        a.imei === dados.imei && a.id !== id
      );

      if (duplicado) {
        throw erro(409, 'IMEI já cadastrado');
      }
    }

    return aparelhoModel.atualizar(id, dados);
  },

  remover(id) {
    const removido = aparelhoModel.remover(id);

    if (!removido) {
      throw erro(404, 'Aparelho não encontrado');
    }
  }
};
