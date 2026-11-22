
function escapar(valor) {
  return String(valor ?? '-')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function moeda(valor) {
  return Number(valor ?? 0).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}

function formatarData(valor) {
  if (!valor) return '-';

  const data = new Date(valor);

  if (Number.isNaN(data.getTime())) return '-';

  return data.toLocaleDateString('pt-BR');
}

function formatarSituacao(valor) {
  const situacoes = {
    em_orcamento: 'Em orçamento',
    aprovado: 'Serviço aprovado',
    nao_aprovado: 'Serviço não aprovado',
    aberta: 'Aberta',
    em_reparo: 'Em reparo',
    finalizada: 'Finalizada',
    entregue: 'Entregue',
    cancelada: 'Cancelada'
  };

  return situacoes[valor] || valor || '-';
}

export function imprimirOS(os, aparelho, cliente, tecnico) {
  const janela = window.open('', '_blank');

  if (!janela) {
    alert('Permita pop-ups para imprimir a OS.');
    return;
  }

  const conteudo = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <title>Ordem de Serviço ${escapar(os.id)}</title>

      <style>
        * {
          box-sizing: border-box;
        }

        body {
          font-family: Arial, sans-serif;
          margin: 35px;
          color: #222;
          font-size: 13px;
        }

        header {
          text-align: center;
          border-bottom: 2px solid #222;
          padding-bottom: 15px;
          margin-bottom: 25px;
        }

        h1 {
          font-size: 25px;
          margin: 0;
        }

        h2 {
          font-size: 15px;
          background: #eee;
          padding: 8px;
          margin-top: 20px;
        }

        .subtitulo {
          color: #555;
          margin-top: 5px;
        }

        .linha {
          display: flex;
          gap: 20px;
          margin-bottom: 10px;
        }

        .campo {
          flex: 1;
        }

        .campo strong {
          display: block;
          margin-bottom: 4px;
        }

        .valor {
          font-size: 20px;
          font-weight: bold;
        }

        .assinaturas {
          display: flex;
          justify-content: space-between;
          gap: 35px;
          margin-top: 80px;
        }

        .assinatura {
          flex: 1;
          text-align: center;
          border-top: 1px solid #222;
          padding-top: 8px;
        }

        footer {
          text-align: center;
          margin-top: 40px;
          font-size: 11px;
          color: #666;
        }

        @page {
          size: A4;
          margin: 15mm;
        }

        @media print {
          body {
            margin: 0;
          }

          .nao-imprimir {
            display: none;
          }
        }
      </style>
    </head>

    <body>

      <header>
        <h1>Moral Cell</h1>
        <div class="subtitulo">
          Assistência Técnica e Loja de Celulares
        </div>
        <h3>ORDEM DE SERVIÇO Nº ${escapar(os.id)}</h3>
      </header>

      <h2>Dados do Cliente</h2>

      <div class="linha">
        <div class="campo">
          <strong>Nome:</strong>
          ${escapar(cliente?.nome)}
        </div>

        <div class="campo">
          <strong>Telefone:</strong>
          ${escapar(cliente?.telefone)}
        </div>
      </div>

      <div class="linha">
        <div class="campo">
          <strong>CPF:</strong>
          ${escapar(cliente?.cpf)}
        </div>

        <div class="campo">
          <strong>E-mail:</strong>
          ${escapar(cliente?.email)}
        </div>
      </div>

      <h2>Dados do Aparelho</h2>

      <div class="linha">
        <div class="campo">
          <strong>Marca:</strong>
          ${escapar(aparelho?.marca)}
        </div>

        <div class="campo">
          <strong>Modelo:</strong>
          ${escapar(aparelho?.modelo)}
        </div>
      </div>

      <div class="campo">
        <strong>IMEI:</strong>
        ${escapar(aparelho?.imei)}
      </div>

      <h2>Informações do Serviço</h2>

      <p>
        <strong>Problema relatado:</strong>
        ${escapar(os.descricaoProblema)}
      </p>

      <div class="linha">
        <div class="campo">
          <strong>Técnico responsável:</strong>
          ${escapar(tecnico?.nome || 'Não atribuído')}
        </div>

        <div class="campo">
          <strong>Data de entrada:</strong>
          ${formatarData(os.dataEntrada)}
        </div>
      </div>

      <div class="linha">
        <div class="campo">
          <strong>Aprovação:</strong>
          ${escapar(formatarSituacao(os.aprovacao))}
        </div>

        <div class="campo">
          <strong>Status:</strong>
          ${escapar(formatarSituacao(os.status))}
        </div>
      </div>

      <div class="linha">
        <div class="campo">
          <strong>Garantia:</strong>
          ${escapar(os.garantia ?? 0)} dias
        </div>

        <div class="campo">
          <strong>Data de conclusão:</strong>
          ${formatarData(os.dataConclusao)}
        </div>
      </div>

      <h2>Valor do Orçamento</h2>

      <p class="valor">
        ${moeda(os.valorOrcamento)}
      </p>

      <p>
        Este documento registra as informações da
        ordem de serviço e a situação do orçamento.
        A emissão não comprova pagamento.
      </p>

      <div class="assinaturas">
        <div class="assinatura">
          Assinatura do Cliente
        </div>

        <div class="assinatura">
          Responsável Pombal Cell
        </div>
      </div>

      <footer>
        Pombal Cell — Assistência Técnica
      </footer>

      <div class="nao-imprimir" style="text-align:center;margin-top:25px">
        <button onclick="window.print()">
          Imprimir / Salvar PDF
        </button>
      </div>

    </body>
    </html>
  `;

  janela.document.open();
  janela.document.write(conteudo);
  janela.document.close();
}
