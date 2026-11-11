export class Pessoa {
  constructor(id, nome) {
    if (new.target === Pessoa) {
      throw new Error('Pessoa é abstrata');
    }
    this.id = id;
    this.nome = nome;
  }
  
  exibirResumo() {
    throw new Error('exibirResumo() precisa ser implementado na classe derivada');
  }
}