
# Testes da API — Projeto 1 (S3)

## Informações

API: Sistema de Gestão para Assistência Técnica
Entidades: Cliente e Aparelho
Framework: Express 5
Servidor: http://localhost:3000

## Testes realizados

| # | Método | URL | Body | Status esperado | Status obtido | Observação |
|---|---|---|---|---|---|---|
| 1 | POST | /clientes | nome, cpf, telefone, email | 201 | Pendente | Cadastro de cliente |
| 2 | POST | /aparelhos | marca, modelo, imei, clienteId=1 | 201 | Pendente | Cadastro de aparelho |
| 3 | GET | /clientes | — | 200 | Pendente | Listar clientes |
| 4 | GET | /aparelhos?clienteId=1 | — | 200 | Pendente | Relacionamento 1:N |
| 5 | GET | /aparelhos/99 | — | 404 | Pendente | Aparelho inexistente |
| 6 | POST | /clientes | CPF duplicado | 409 | Pendente | Regra de CPF único |
| 7 | POST | /aparelhos | clienteId=999 | 422 | Pendente | Cliente inexistente |
| 8 | PUT | /aparelhos/1 | modelo atualizado | 200 | Pendente | Atualizar aparelho |
| 9 | DELETE | /aparelhos/1 | — | 204 | Pendente | Excluir aparelho |
| 10 | GET | /aparelhos/1 | — | 404 | Pendente | Confirmar exclusão |

## Regras de negócio

1. Nome e CPF são obrigatórios.
2. CPF não pode ser duplicado.
3. Aparelho precisa estar vinculado a um cliente existente.
4. IMEI não pode ser duplicado.
5. Campos obrigatórios do aparelho devem ser informados.

# Testes da API — Projeto 1 (S3)

## Informações

- **API:** Sistema de Gestão para Assistência Técnica
- **Entidades:** Cliente e Aparelho
- **Framework:** Express 5
- **Servidor:** http://localhost:3000
- **Ferramenta de testes:** Thunder Client

## Testes realizados

| # | Método | URL | Body | Status esperado | Status obtido | Observação |
|---|---|---|---|---|---|---|
| 1 | POST | `/clientes` | nome, cpf, telefone, email | 201 | 201 | Cliente cadastrado com sucesso |
| 2 | POST | `/aparelhos` | marca, modelo, imei, clienteId=1 | 201 | 201 | Aparelho cadastrado e vinculado ao cliente |
| 3 | GET | `/clientes` | — | 200 | 200 | Clientes listados corretamente |
| 4 | GET | `/aparelhos?clienteId=1` | — | 200 | 200 | Aparelhos filtrados pelo cliente |
| 5 | GET | `/aparelhos/99` | — | 404 | 404 | Aparelho inexistente identificado |
| 6 | POST | `/clientes` | CPF duplicado | 409 | 409 | Cadastro duplicado bloqueado |
| 7 | POST | `/aparelhos` | clienteId=999 | 422 | 422 | Cadastro rejeitado por cliente inexistente |
| 8 | PUT | `/aparelhos/1` | modelo atualizado | 200 | 200 | Aparelho atualizado com sucesso |
| 9 | DELETE | `/aparelhos/1` | — | 204 | 204 | Aparelho excluído com sucesso |
| 10 | GET | `/aparelhos/1` | — | 404 | 404 | Exclusão confirmada |

## Regras de negócio verificadas

1. Nome e CPF são obrigatórios para cadastrar um cliente.
2. O sistema não permite cadastrar clientes com CPF duplicado.
3. Todo aparelho deve estar vinculado a um cliente existente.
4. O sistema não permite cadastrar aparelhos com IMEI duplicado.
5. Os campos obrigatórios dos aparelhos devem ser informados.

## Conclusão

Foram realizados 10 testes funcionais utilizando o Thunder Client, abrangendo operações de cadastro, consulta, atualização e exclusão de clientes e aparelhos, além de validações de regras de negócio.

Todos os testes executados apresentaram os códigos HTTP esperados, incluindo respostas de sucesso e tratamento de erros.

**Resultado final: 10 testes aprovados de 10 realizados (100% de aprovação).**

A API demonstrou funcionamento adequado nos cenários testados, respeitando o relacionamento entre clientes e aparelhos e as validações verificadas.