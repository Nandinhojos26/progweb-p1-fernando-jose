# Projeto 1 — Programação Web (UEPB · 2026.2)
**Aluno(a):** Fernando José
**Disciplina:** Programação Web · Prof. Rodrigo Alves Costa


# progweb-p1-fernando-jose
Sistema de Gestão para Assistência Técnica e Loja de Celulares

##  Como baixar e rodar o projeto

### Pré-requisitos

- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/) (versão LTS recomendada) e npm

Para conferir se estão instalados:

```bash
git --version
node --version
```

### 1. Clonar o repositório

```bash
git clone https://github.com/Nandinhojos26/progweb-p1-fernando-jose.git
cd progweb-p1-fernando-jose
```

### 2. Instalar as dependências

```bash
npm install
```

### 3. Executar no terminal

```bash
node index.js
```

O programa roda e exibe a saída diretamente no terminal.

### Alternativa: baixar como ZIP

1. Acesse a página do repositório no GitHub.
2. Clique em Code e Download ZIP.

## Domínio do Projeto

O projeto consiste em um sistema de gerenciamento de assistência técnica e loja de celulares. A aplicação tem como objetivo organizar os clientes, os aparelhos cadastrados, as ordens de serviço e os técnicos responsáveis pelos reparos.

### Entidades principais

- Cliente: armazena os dados dos clientes.
- Aparelho: registra os dispositivos pertencentes aos clientes.
- Ordem de Serviço: registra os atendimentos e acompanha o status dos reparos.
- Técnico: armazena os dados dos profissionais responsáveis pelos serviços.

A modelagem inicial está documentada no arquivo [MODELAGEM.md](MODELAGEM.md).


## Sobre

Aplicação fullstack (API Express em camadas + SQLite + frontend Bootstrap com Vanilla JS).