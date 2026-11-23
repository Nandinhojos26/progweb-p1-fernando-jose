
import { db } from '../db.js';

const COLUNAS = `
  id, marca, modelo, imei,
  cliente_id AS clienteId
`;

export const aparelhoModel = {

  listar() {
    return db.prepare(`
      SELECT ${COLUNAS}
      FROM aparelhos
      ORDER BY id
    `).all();
  },

  buscarPorId(id) {
    return db.prepare(`
      SELECT ${COLUNAS}
      FROM aparelhos
      WHERE id = ?
    `).get(id) ?? null;
  },

  listarPorCliente(clienteId) {
    return db.prepare(`
      SELECT ${COLUNAS}
      FROM aparelhos
      WHERE cliente_id = ?
      ORDER BY id
    `).all(clienteId);
  },

  existeImei(imei) {
    const aparelho = db.prepare(
      'SELECT 1 FROM aparelhos WHERE imei = ?'
    ).get(imei);

    return aparelho !== undefined;
  },

  inserir({ marca, modelo, imei, clienteId }) {
    const resultado = db.prepare(`
      INSERT INTO aparelhos (marca, modelo, imei, cliente_id)
      VALUES (?, ?, ?, ?)
    `).run(marca, modelo, imei, clienteId);

    return this.buscarPorId(Number(resultado.lastInsertRowid));
  },

  atualizar(id, dados) {
    const atual = this.buscarPorId(id);

    if (!atual) return null;

    const novo = { ...atual, ...dados, id };

    db.prepare(`
      UPDATE aparelhos
      SET marca = ?, modelo = ?, imei = ?, cliente_id = ?
      WHERE id = ?
    `).run(
      novo.marca,
      novo.modelo,
      novo.imei,
      novo.clienteId,
      id
    );

    return this.buscarPorId(id);
  },

  remover(id) {
    const resultado = db.prepare(
      'DELETE FROM aparelhos WHERE id = ?'
    ).run(id);

    return resultado.changes > 0;
  }
};
