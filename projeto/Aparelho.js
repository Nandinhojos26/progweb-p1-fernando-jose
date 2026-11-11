export class Aparelho {
  #imei; // PImei privado

  constructor(id, marca, modelo, imei, clienteCorrelacionado) {
    this.id = id;
    this.marca = marca;
    this.modelo = modelo;
    this.#imei = imei;
    this.cliente = clienteCorrelacionado; // Relação 1 para 1 
  }

  get imei() {
    return this.#imei;
  }
}