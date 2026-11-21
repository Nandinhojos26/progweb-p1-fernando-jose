
import { tecnicoService } from '../services/tecnicoService.js';

export const tecnicoController = {
  listar: (req, res) => {
    res.json(tecnicoService.listar());
  },

  buscarPorId: (req, res) => {
    const id = Number(req.params.id);

    res.json(tecnicoService.buscarPorId(id));
  },

  criar: (req, res) => {
    const tecnico = tecnicoService.criar(req.body);

    res.status(201).json(tecnico);
  },

  atualizar: (req, res) => {
    const id = Number(req.params.id);

    const tecnico = tecnicoService.atualizar(
      id,
      req.body
    );

    res.json(tecnico);
  },

  remover: (req, res) => {
    const id = Number(req.params.id);

    tecnicoService.remover(id);

    res.status(204).end();
  }
};
