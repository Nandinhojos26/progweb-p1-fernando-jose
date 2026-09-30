import { Cliente } from './Cliente.js';
import { Aparelho } from './Aparelho.js';


const cliente1 = new Cliente(1, 'Fernando José', '8399999-9999');
const celular = new Aparelho(101, 'Apple', 'iPhone 15 Pro', '123456789012345', cliente1);

console.log(' Sistema de Gestão');
console.log(cliente1.exibirResumo());   
console.log(`Aparelho recebido: ${celular.marca} ${celular.modelo}`);
console.log(`Dono do Aparelho: ${celular.cliente.nome}`);
console.log(`IMEI do Aparelho: ${celular.imei}`);

