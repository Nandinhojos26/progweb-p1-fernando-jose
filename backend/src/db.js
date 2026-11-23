
import { DatabaseSync } from 'node:sqlite';

const arquivo = process.env.DB_FILE ?? 'banco.db';

export const db = new DatabaseSync(arquivo);

// Ativa a integridade referencial
db.exec('PRAGMA foreign_keys = ON;');

// Cria as tabelas do sistema
db.exec(`
  CREATE TABLE IF NOT EXISTS clientes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    cpf TEXT NOT NULL UNIQUE,
    telefone TEXT,
    email TEXT
  );

  CREATE TABLE IF NOT EXISTS aparelhos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    marca TEXT NOT NULL,
    modelo TEXT NOT NULL,
    imei TEXT NOT NULL UNIQUE,
    cliente_id INTEGER NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
  );
  CREATE TABLE IF NOT EXISTS tecnicos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    telefone TEXT,
    especialidade TEXT
  );

  CREATE TABLE IF NOT EXISTS ordens_servico (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    aparelho_id INTEGER NOT NULL,
    cliente_id INTEGER NOT NULL,
    tecnico_id INTEGER,

    descricao_problema TEXT NOT NULL,
    valor_orcamento REAL NOT NULL DEFAULT 0,

    aprovacao TEXT NOT NULL DEFAULT 'em_orcamento'
      CHECK (
        aprovacao IN (
          'em_orcamento',
          'aprovado',
          'nao_aprovado'
        )
      ),

    status TEXT NOT NULL DEFAULT 'aberta'
      CHECK (
        status IN (
          'aberta',
          'em_reparo',
          'finalizada',
          'entregue',
          'cancelada'
        )
      ),

    garantia INTEGER NOT NULL DEFAULT 90,

    data_entrada TEXT NOT NULL,
    data_conclusao TEXT,

    FOREIGN KEY (aparelho_id)
      REFERENCES aparelhos(id),

    FOREIGN KEY (cliente_id)
      REFERENCES clientes(id),

    FOREIGN KEY (tecnico_id)
      REFERENCES tecnicos(id)
  );
`);
