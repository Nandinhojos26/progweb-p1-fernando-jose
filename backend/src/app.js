
import express from 'express';

import clientesRouter from './routes/clientes.js';

import { logger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// Middlewares
app.use(express.json());
app.use(logger);

// Rota inicial
app.get('/', (req, res) => {
  res.json({
    api: 'Sistema de Assistência Técnica',
    versao: '1.0.0',
    rotas: ['/clientes']
  });
});

// Rotas de clientes
app.use('/clientes', clientesRouter);

// Rota não encontrada
app.use((req, res) => {
  res.status(404).json({
    erro: `Rota ${req.method} ${req.url} não existe`
  });
});

// Tratamento de erros
app.use(errorHandler);

export default app;
