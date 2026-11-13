
import { clienteService } from '../services/clienteService.js';

export const clienteController = {

  listar(req, res) {
    res.json(clienteService.listar());
  },

  buscarPorId(req, res) {
    const id = Number(req.params.id);

    res.json(clienteService.buscarPorId(id));
  },

  criar(req, res) {
    const novo = clienteService.criar(req.body);

    res.status(201).json(novo);
  },

  atualizar(req, res) {
    const id = Number(req.params.id);

    const cliente = clienteService.atualizar(
      id,
      req.body
    );

    res.json(cliente);
  },

  remover(req, res) {
    const id = Number(req.params.id);

    clienteService.remover(id);

    res.status(204).end();
  }
};
