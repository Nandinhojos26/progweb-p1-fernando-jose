
import { ordemServicoModel } from '../models/ordemServicoModel.js';
import { aparelhoModel } from '../models/aparelhoModel.js';
import { tecnicoModel } from '../models/tecnicoModel.js';
import { erro } from '../utils/erro.js';

const aprovacoes = [
  'em_orcamento',
  'aprovado',
  'nao_aprovado'
];

const statusPermitidos = [
  'aberta',
  'em_reparo',
  'finalizada',
  'entregue',
  'cancelada'
];

function validarId(id, campo) {
  if (!Number.isInteger(id) || id <= 0) {
    throw erro(400, `${campo} deve ser um inteiro positivo`);
  }
}

function validarValor(valor) {
  if (
    typeof valor !== 'number' ||
    !Number.isFinite(valor) ||
    valor < 0
  ) {
    throw erro(400, 'Valor do orçamento inválido');
  }
}

function validarTecnico(tecnicoId) {
  if (tecnicoId === null) return;

  validarId(tecnicoId, 'tecnicoId');

  if (!tecnicoModel.buscarPorId(tecnicoId)) {
    throw erro(422, 'Técnico não encontrado');
  }
}

function validarStatus(status, aprovacao, tecnicoId) {
  if (!statusPermitidos.includes(status)) {
    throw erro(400, 'Status inválido');
  }

  if (
    ['em_reparo', 'finalizada', 'entregue'].includes(status) &&
    aprovacao !== 'aprovado'
  ) {
    throw erro(422, 'O orçamento precisa estar aprovado');
  }

  if (
    ['em_reparo', 'finalizada'].includes(status) &&
    tecnicoId === null
  ) {
    throw erro(422, 'Informe o técnico responsável');
  }
}

export const ordemServicoService = {

  listar() {
    return ordemServicoModel.listar();
  },

  buscarPorId(id) {
    validarId(id, 'id');

    const os = ordemServicoModel.buscarPorId(id);

    if (!os) {
      throw erro(404, 'Ordem de Serviço não encontrada');
    }

    return os;
  },

  criar(dados = {}) {
    const {
      aparelhoId,
      tecnicoId = null,
      descricaoProblema,
      valorOrcamento = 0,
      aprovacao = 'em_orcamento',
      garantia = 90
    } = dados;

    validarId(aparelhoId, 'aparelhoId');

    const aparelho = aparelhoModel.buscarPorId(aparelhoId);

    if (!aparelho) {
      throw erro(422, 'Aparelho não encontrado');
    }

    if (
      typeof descricaoProblema !== 'string' ||
      !descricaoProblema.trim()
    ) {
      throw erro(400, 'Descrição do problema obrigatória');
    }

    validarValor(valorOrcamento);
    validarTecnico(tecnicoId);

    if (!aprovacoes.includes(aprovacao)) {
      throw erro(400, 'Situação do orçamento inválida');
    }

    if (!Number.isInteger(garantia) || garantia < 0) {
      throw erro(400, 'Garantia inválida');
    }

    return ordemServicoModel.inserir({
      aparelhoId,
      clienteId: aparelho.clienteId,
      tecnicoId,
      descricaoProblema: descricaoProblema.trim(),
      valorOrcamento,
      aprovacao,
      status: 'aberta',
      garantia
    });
  },

  atualizar(id, dados = {}) {
    const atual = this.buscarPorId(id);
    const permitidos = [
      'tecnicoId',
      'descricaoProblema',
      'valorOrcamento',
      'aprovacao',
      'status',
      'garantia'
    ];

    const alteracoes = {};

    for (const campo of permitidos) {
      if (dados[campo] !== undefined) {
        alteracoes[campo] = dados[campo];
      }
    }

    if (alteracoes.tecnicoId !== undefined) {
      validarTecnico(alteracoes.tecnicoId);
    }

    if (alteracoes.valorOrcamento !== undefined) {
      validarValor(alteracoes.valorOrcamento);
    }

    if (alteracoes.descricaoProblema !== undefined) {
      if (
        typeof alteracoes.descricaoProblema !== 'string' ||
        !alteracoes.descricaoProblema.trim()
      ) {
        throw erro(400, 'Descrição inválida');
      }

      alteracoes.descricaoProblema =
        alteracoes.descricaoProblema.trim();
    }

    if (
      alteracoes.aprovacao !== undefined &&
      !aprovacoes.includes(alteracoes.aprovacao)
    ) {
      throw erro(400, 'Aprovação inválida');
    }

    if (
      alteracoes.garantia !== undefined &&
      (!Number.isInteger(alteracoes.garantia) ||
        alteracoes.garantia < 0)
    ) {
      throw erro(400, 'Garantia inválida');
    }

    const nova = { ...atual, ...alteracoes };

    validarStatus(
      nova.status,
      nova.aprovacao,
      nova.tecnicoId
    );

    if (
      atual.status === 'entregue' &&
      nova.status !== 'entregue'
    ) {
      throw erro(422, 'Uma OS entregue não pode ser reaberta');
    }

    if (nova.status === 'finalizada' &&
        atual.status !== 'finalizada') {
      alteracoes.dataConclusao = new Date().toISOString();
    }

    if (
      !['finalizada', 'entregue'].includes(nova.status)
    ) {
      alteracoes.dataConclusao = null;
    }

    return ordemServicoModel.atualizar(id, alteracoes);
  },

  remover(id) {
    this.buscarPorId(id);

    return ordemServicoModel.remover(id);
  }
};
