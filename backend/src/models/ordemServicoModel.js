
import { db } from '../db.js';

const COLUNAS = `
  id,
  aparelho_id AS aparelhoId,
  cliente_id AS clienteId,
  tecnico_id AS tecnicoId,
  descricao_problema AS descricaoProblema,
  valor_orcamento AS valorOrcamento,
  aprovacao,
  status,
  garantia,
  data_entrada AS dataEntrada,
  data_conclusao AS dataConclusao
`;

export const ordemServicoModel = {

  listar() {
    return db.prepare(`
      SELECT ${COLUNAS}
      FROM ordens_servico
      ORDER BY id DESC
    `).all();
  },

  buscarPorId(id) {
    return db.prepare(`
      SELECT ${COLUNAS}
      FROM ordens_servico
      WHERE id = ?
    `).get(id) ?? null;
  },

  listarPorAparelho(aparelhoId) {
    return db.prepare(`
      SELECT ${COLUNAS}
      FROM ordens_servico
      WHERE aparelho_id = ?
      ORDER BY id DESC
    `).all(aparelhoId);
  },

  listarPorTecnico(tecnicoId) {
    return db.prepare(`
      SELECT ${COLUNAS}
      FROM ordens_servico
      WHERE tecnico_id = ?
      ORDER BY id DESC
    `).all(tecnicoId);
  },

  inserir(dados) {
    const dataEntrada = new Date().toISOString();

    const resultado = db.prepare(`
      INSERT INTO ordens_servico (
        aparelho_id,
        cliente_id,
        tecnico_id,
        descricao_problema,
        valor_orcamento,
        aprovacao,
        status,
        garantia,
        data_entrada,
        data_conclusao
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      dados.aparelhoId,
      dados.clienteId,
      dados.tecnicoId ?? null,
      dados.descricaoProblema,
      dados.valorOrcamento,
      dados.aprovacao,
      dados.status,
      dados.garantia,
      dataEntrada,
      null
    );

    return this.buscarPorId(
      Number(resultado.lastInsertRowid)
    );
  },

  atualizar(id, dados) {
    const atual = this.buscarPorId(id);

    if (!atual) return null;

    const novo = {
      ...atual,
      ...dados,
      id
    };

    db.prepare(`
      UPDATE ordens_servico
      SET tecnico_id = ?,
          descricao_problema = ?,
          valor_orcamento = ?,
          aprovacao = ?,
          status = ?,
          garantia = ?,
          data_conclusao = ?
      WHERE id = ?
    `).run(
      novo.tecnicoId,
      novo.descricaoProblema,
      novo.valorOrcamento,
      novo.aprovacao,
      novo.status,
      novo.garantia,
      novo.dataConclusao,
      id
    );

    return this.buscarPorId(id);
  },

  remover(id) {
    const resultado = db.prepare(`
      DELETE FROM ordens_servico
      WHERE id = ?
    `).run(id);

    return resultado.changes > 0;
  }
};
