# Sistema de Gestão para Assistência Técnica

**Projeto 1 — Programação Web | UEPB — 2026.2**

**Aluno:** Fernando Jose
**Professor:** Rodrigo Alves Costa
**Curso:** Ciência da Computação

## 1. Sobre o projeto

O Sistema de Gestão para Assistência Técnica  é uma aplicação web desenvolvida para auxiliar no gerenciamento de uma loja de celulares e assistência técnica.

O sistema permite cadastrar clientes, registrar aparelhos, gerenciar técnicos e acompanhar ordens de serviço, incluindo orçamentos, aprovação de serviços, acompanhamento de reparos e emissão de recibos.

O projeto utiliza uma arquitetura em camadas, separando a interface, as regras de negócio e a persistência dos dados.

## 2. Links do projeto

- **Repositório:** https://github.com/Nandinhojos26/progweb-p1-fernando-jose
- **Frontend (Vercel):** https://moral-cell.vercel.app
- **Backend (Render):** https://moral-cell-api.onrender.com
- **Vídeo de apresentação:** https://www.youtube.com/watch?v=b1cByk9jZKk

**Observação:** No plano gratuito do Render, o servidor pode demorar para responder após um período de inatividade. O banco SQLite hospedado em disco efêmero pode ser recriado quando o serviço reiniciar.

## 3. Tecnologias utilizadas

### Backend
- Node.js 22 ou superior
- Express 5
- SQLite (`node:sqlite`)
- JavaScript com ES Modules
- API REST
- CORS

### Frontend
- HTML5
- CSS3
- Bootstrap 5
- JavaScript
- Fetch API

### Ferramentas
- Git e GitHub
- Visual Studio Code
- Thunder Client

## 4. Funcionalidades

O sistema possui quatro entidades principais:

**Clientes:** cadastro, listagem, consulta, atualização e exclusão de clientes.

**Aparelhos:** cadastro de dispositivos associados a clientes, incluindo marca, modelo e IMEI.

**Técnicos:** gerenciamento dos profissionais responsáveis pelos reparos.

**Ordens de Serviço:** registro dos atendimentos, descrição dos problemas, orçamento, aprovação, acompanhamento do status, garantia e conclusão dos serviços.

O frontend também contempla funcionalidades de emissão de recibos.

## 5. Como executar localmente

### Pré-requisitos

Instale:

- Git: https://git-scm.com/downloads
- Node.js 22 ou superior: https://nodejs.org/

### Clonar o repositório

```bash
git clone https://github.com/Nandinhojos26/progweb-p1-fernando-jose.git
cd progweb-p1-fernando-jose
```

### Executar o backend

Entre na pasta:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

Crie o arquivo `.env` a partir de `.env.example` e configure:

```env
PORT=3000
DB_FILE=banco.db
CORS_ORIGIN=http://localhost:5500,http://127.0.0.1:5500
```

Inicie o servidor:

```bash
npm run dev
```

A API estará disponível em:

http://localhost:3000

O SQLite cria automaticamente as tabelas necessárias, caso ainda não existam.

### Executar o frontend

Abra outro terminal na raiz do repositório e execute:

```bash
cd frontend
npx http-server -p 5500 -c-1
```

Acesse:

http://localhost:5500

## 6. Rotas da API

### Clientes

| Método | Rota | Descrição |
|---|---|---|
| GET | `/clientes` | Listar clientes |
| GET | `/clientes/:id` | Consultar cliente |
| POST | `/clientes` | Cadastrar cliente |
| PUT | `/clientes/:id` | Atualizar cliente |
| DELETE | `/clientes/:id` | Excluir cliente |

### Aparelhos

| Método | Rota | Descrição |
|---|---|---|
| GET | `/aparelhos` | Listar aparelhos |
| GET | `/aparelhos/:id` | Consultar aparelho |
| POST | `/aparelhos` | Cadastrar aparelho |
| PUT | `/aparelhos/:id` | Atualizar aparelho |
| DELETE | `/aparelhos/:id` | Excluir aparelho |

### Técnicos

| Método | Rota | Descrição |
|---|---|---|
| GET | `/tecnicos` | Listar técnicos |
| GET | `/tecnicos/:id` | Consultar técnico |
| POST | `/tecnicos` | Cadastrar técnico |
| PUT | `/tecnicos/:id` | Atualizar técnico |
| DELETE | `/tecnicos/:id` | Excluir técnico |

### Ordens de Serviço

| Método | Rota | Descrição |
|---|---|---|
| GET | `/ordens-servico` | Listar ordens |
| GET | `/ordens-servico/:id` | Consultar ordem |
| POST | `/ordens-servico` | Criar ordem |
| PUT | `/ordens-servico/:id` | Atualizar ordem |
| DELETE | `/ordens-servico/:id` | Excluir ordem |

As rotas e métodos devem ser conferidos com os arquivos da pasta `backend/src/routes/`.

## 7. Regras de negócio

- O CPF de cada cliente deve ser único.
- O IMEI de cada aparelho deve ser único.
- Um aparelho deve estar associado a um cliente existente.
- Uma ordem de serviço deve estar associada aos registros necessários.
- As ordens de serviço possuem estados de aprovação e execução definidos.
- A exclusão de registros vinculados pode ser bloqueada para preservar a integridade referencial.
- Os erros da API seguem o formato JSON com o campo `erro`.

## 8. Estrutura do projeto

```text
progweb-p1-fernando-jose/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── middleware/
│   │   ├── app.js
│   │   ├── db.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── index.html
│   └── js/
├── s1/
├── s2/
├── s3/
├── s4/
├── MODELAGEM.md
└── README.md
```

### Arquitetura do backend

O backend utiliza separação em camadas:

- **Routes:** definem os endpoints.
- **Controllers:** recebem requisições e enviam respostas.
- **Services:** implementam as regras de negócio.
- **Models:** executam operações de persistência.
- **Middleware:** realiza tarefas como registro de requisições e tratamento de erros.
- **db.js:** configura a conexão e as tabelas SQLite.

## 9. Persistência dos dados

O sistema utiliza SQLite com comandos SQL parametrizados.

As tabelas são:

- `clientes`
- `aparelhos`
- `tecnicos`
- `ordens_servico`

A integridade referencial é ativada por:

```sql
PRAGMA foreign_keys = ON;
```

Os dados são armazenados no arquivo configurado pela variável de ambiente `DB_FILE`.

## 10. Deploy

O sistema está publicado e funcionando em produção.

- Render: hospedagem da API Express.
- Vercel: hospedagem do frontend Bootstrap.
- SQLite: persistência dos dados.
- CORS: comunicação autorizada entre frontend e backend.

Todos os testes funcionais realizados em produção foram aprovados.

O plano gratuito do Render utiliza armazenamento efêmero.
Os dados de demonstração são recriados quando o banco está vazio.

## 11. Modelagem

A modelagem inicial do sistema está disponível no arquivo [MODELAGEM.md](MODELAGEM.md).

## 12. Autor

**Fernando Jose**
Ciência da Computação — Universidade Estadual da Paraiba (UEPB)
Projeto acadêmico da disciplina Programação Web — 2026.2.
