
# Parte B — Frontend do Projeto 1

## Sistema de Gestão de Assistência Técnica — Moral Cell

### 1. Objetivo

Desenvolver uma interface web responsiva para o Sistema de
Gestão de Assistência Técnica, permitindo o gerenciamento
de clientes e aparelhos por meio de uma API REST.

### 2. Tecnologias utilizadas

- HTML5
- CSS3
- Bootstrap 5
- Bootstrap Icons
- JavaScript ES Modules
- Fetch API
- Node.js e Express 5 (backend)

### 3. Tela de Clientes

Funcionalidades implementadas:

- Cadastro de clientes.
- Listagem de clientes cadastrados.
- Edição de informações.
- Exclusão de clientes.
- Atualização da listagem.
- Exibição de mensagens de sucesso e erro.

Campos do formulário:

- Nome completo
- CPF
- Telefone
- E-mail

### 4. Tela de Aparelhos

Funcionalidades implementadas:

- Cadastro de aparelhos.
- Listagem de aparelhos.
- Edição de informações.
- Exclusão de aparelhos.
- Associação de aparelhos a clientes.

Campos do formulário:

- Marca
- Modelo
- IMEI
- Cliente responsável

### 5. Integração com a API

Frontend: http://localhost:5500

Backend: http://localhost:3000

Endpoints utilizados:

- GET /clientes
- POST /clientes
- PUT /clientes/:id
- DELETE /clientes/:id
- GET /aparelhos
- POST /aparelhos
- PUT /aparelhos/:id
- DELETE /aparelhos/:id

A comunicação utiliza Fetch API e JSON.

### 6. Arquitetura do frontend

- config.js: endereço da API.
- api.js: requisições HTTP.
- services/: operações com clientes e aparelhos.
- state/store.js: estado da aplicação.
- ui/: renderização das tabelas e mensagens.
- main.js: eventos, formulários e navegação.

### 7. Estados da interface

O sistema apresenta quatro estados:

1. Carregando: durante a consulta à API.
2. Vazio: quando não existem registros.
3. Erro: quando ocorre uma falha.
4. Sucesso: quando os dados são carregados.

### 8. Testes realizados

| Teste | Resultado |
|---|---|
| Cadastrar cliente | Passou |
| Editar cliente | Passou |
| Cadastrar aparelho | Passou |
| Editar aparelho | Passou |
| Remover aparelho | Passou |
| Remover cliente | Passou |

### 9. Responsividade

A interface utiliza o sistema de grid do Bootstrap 5,
com formulários, tabelas e componentes adaptáveis
a diferentes tamanhos de tela.

### 10. Funcionalidades futuras

- Cadastro de técnicos.
- Gerenciamento de ordens de serviço.
- Acompanhamento de reparos.
- Emissão de recibos em PDF.
