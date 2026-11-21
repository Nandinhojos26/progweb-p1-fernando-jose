
import { ordemServicoService } from '../services/ordemServicoService.js';

export const ordemServicoController = {

  listar(req, res) {
    const ordens = ordemServicoService.listar();
    res.status(200).json(ordens);
  },

  buscarPorId(req, res) {
    const id = Number(req.params.id);

    const os = ordemServicoService.buscarPorId(id);
    res.status(200).json(os);
  },

  criar(req, res) {
    const novaOS = ordemServicoService.criar(req.body);
    res.status(201).json(novaOS);
  },

  atualizar(req, res) {
    const id = Number(req.params.id);

    const os = ordemServicoService.atualizar(
      id,
      req.body
    );

    res.status(200).json(os);
  },

  remover(req, res) {
    const id = Number(req.params.id);

    ordemServicoService.remover(id);
    res.status(204).end();
  }
};
