
import { db } from '../db.js';

export const clienteModel = {

  listar() {
    return db.prepare(
      'SELECT * FROM clientes ORDER BY id'
    ).all();
  },

  buscarPorId(id) {
    return db.prepare(
      'SELECT * FROM clientes WHERE id = ?'
    ).get(id) ?? null;
  },

  existeCpf(cpf) {
    const cliente = db.prepare(
      'SELECT 1 FROM clientes WHERE cpf = ?'
    ).get(cpf);

    return cliente !== undefined;
  },

  inserir({ nome, cpf, telefone, email }) {
    const resultado = db.prepare(`
      INSERT INTO clientes (nome, cpf, telefone, email)
      VALUES (?, ?, ?, ?)
    `).run(
      nome,
      cpf,
      telefone ?? null,
      email ?? null
    );

    return this.buscarPorId(Number(resultado.lastInsertRowid));
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
      UPDATE clientes
      SET nome = ?, cpf = ?, telefone = ?, email = ?
      WHERE id = ?
    `).run(
      novo.nome,
      novo.cpf,
      novo.telefone ?? null,
      novo.email ?? null,
      id
    );

    return this.buscarPorId(id);
  },

  remover(id) {
    const resultado = db.prepare(
      'DELETE FROM clientes WHERE id = ?'
    ).run(id);

    return resultado.changes > 0;
  }
};
