export class Cliente {
  constructor(id, nome, telefone) {
    this.id = id;
    this.nome = nome;
    this.telefone = telefone;
  }

  exibirResumo() {
    return `Cliente: ${this.nome} , Contato: ${this.telefone}`;
  }
}