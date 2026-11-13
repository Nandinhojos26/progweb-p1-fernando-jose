// Erro personalizado para a API

export function erro(status, message) {
  const e = new Error(message);
  e.status = status;
  return e;
}