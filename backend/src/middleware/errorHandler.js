
export function errorHandler(err, req, res, next) {

  // Trata erros de chave estrangeira do SQLite
  if (
    err.code === 'SQLITE_CONSTRAINT_FOREIGNKEY' ||
    err.message?.includes('FOREIGN KEY constraint failed')
  ) {
    console.error(
      `${req.method} ${req.url} -> 409: Registro possui vínculos`
    );

    return res.status(409).json({
      erro: 'Não é possível excluir este registro porque existem dados vinculados a ele.'
    });
  }

  // Tratamento dos demais erros
  const status = err.status ?? 500;

  console.error(
    `${req.method} ${req.url} -> ${status}: ${err.message}`
  );

  return res.status(status).json({
    erro: err.message ?? 'Erro interno do servidor'
  });
}
