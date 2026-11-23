
import { db } from '../db.js';

export const tecnicoModel = {

  listar() {
    return db.prepare(`
      SELECT * FROM tecnicos ORDER BY id
    `).all();
  },

  buscarPorId(id) {
    return db.prepare(`
      SELECT * FROM tecnicos WHERE id = ?
    `).get(id) ?? null;
  },

  criar(dados) {
    const resultado = db.prepare(`
      INSERT INTO tecnicos
        (nome, telefone, especialidade)
      VALUES (?, ?, ?)
    `).run(
      dados.nome,
      dados.telefone ?? '',
      dados.especialidade ?? ''
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
      UPDATE tecnicos
      SET nome = ?,
          telefone = ?,
          especialidade = ?
      WHERE id = ?
    `).run(
      novo.nome,
      novo.telefone,
      novo.especialidade,
      id
    );

    return this.buscarPorId(id);
  },

  remover(id) {
    const resultado = db.prepare(`
      DELETE FROM tecnicos WHERE id = ?
    `).run(id);

    return resultado.changes > 0;
  }
};
