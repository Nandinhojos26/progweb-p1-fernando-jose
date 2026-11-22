
import { API_BASE } from './config.js';

// Camada responsável pela comunicação HTTP.
async function request(metodo, caminho, dados) {
  const opcoes = {
    method: metodo,
    headers: {}
  };

  if (dados !== undefined) {
    opcoes.headers['Content-Type'] = 'application/json';
    opcoes.body = JSON.stringify(dados);
  }

  let resposta;

  try {
    resposta = await fetch(`${API_BASE}${caminho}`, opcoes);
  } catch {
    throw new Error(
      'Não foi possível conectar à API. Verifique se o backend está funcionando.'
    );
  }

  if (resposta.status === 204) {
    return null;
  }

  const corpo = await resposta.json().catch(() => null);

  if (!resposta.ok) {
    throw new Error(
      corpo?.erro ??
      corpo?.mensagem ??
      `Erro HTTP ${resposta.status}`
    );
  }

  return corpo;
}

export const api = {
  get: (caminho) => request('GET', caminho),

  post: (caminho, dados) =>
    request('POST', caminho, dados),

  put: (caminho, dados) =>
    request('PUT', caminho, dados),

  delete: (caminho) =>
    request('DELETE', caminho)
};
