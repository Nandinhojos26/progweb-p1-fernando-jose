
import { aparelhoService } from '../services/aparelhoService.js';

export const aparelhoController = {

  listar(req, res) {
    const clienteId = req.query.clienteId === undefined
      ? undefined
      : Number(req.query.clienteId);

    res.json(aparelhoService.listar(clienteId));
  },

  buscarPorId(req, res) {
    const id = Number(req.params.id);

    res.json(aparelhoService.buscarPorId(id));
  },

  criar(req, res) {
    const novo = aparelhoService.criar(req.body);

    res.status(201).json(novo);
  },

  atualizar(req, res) {
    const id = Number(req.params.id);

    const aparelho = aparelhoService.atualizar(
      id,
      req.body
    );

    res.json(aparelho);
  },

  remover(req, res) {
    const id = Number(req.params.id);

    aparelhoService.remover(id);

    res.status(204).end();
  }
};
