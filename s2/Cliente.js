import { Pessoa } from './Pessoa.js';

export class Cliente extends Pessoa {
  constructor(id, nome, telefone) {
    super(id, nome); // Chama o construtor da classe mae
    this.telefone = telefone;
  }

  exibirResumo() {
    return `Cliente: ${this.nome} | Contato: ${this.telefone}`;
  }
}