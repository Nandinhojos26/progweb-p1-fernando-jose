
import { tecnicoModel } from '../models/tecnicoModel.js';
import { erro } from '../utils/erro.js';

export const tecnicoService = {
  listar: () => tecnicoModel.listar(),

  buscarPorId: (id) => {
    const tecnico = tecnicoModel.buscarPorId(id);

    if (!tecnico) {
      throw erro(404, 'Técnico não encontrado');
    }

    return tecnico;
  },

  criar: (dados) => {
    if (!dados?.nome?.trim()) {
      throw erro(400, 'Nome do técnico é obrigatório');
    }

    return tecnicoModel.criar({
      nome: dados.nome.trim(),
      telefone: dados.telefone ?? '',
      especialidade: dados.especialidade ?? ''
    });
  },

  atualizar: (id, dados) => {
    if (dados.nome !== undefined &&
        !dados.nome?.trim()) {
      throw erro(400, 'Nome inválido');
    }

    const atualizados = {};

    for (const campo of [
      'nome',
      'telefone',
      'especialidade'
    ]) {
      if (dados[campo] !== undefined) {
        atualizados[campo] = dados[campo];
      }
    }

    const tecnico = tecnicoModel.atualizar(
      id,
      atualizados
    );

    if (!tecnico) {
      throw erro(404, 'Técnico não encontrado');
    }

    return tecnico;
  },

  remover: (id) => {
    if (!tecnicoModel.remover(id)) {
      throw erro(404, 'Técnico não encontrado');
    }
  }
};
