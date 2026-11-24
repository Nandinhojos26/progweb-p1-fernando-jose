
import express from 'express';
import cors from 'cors';

import clientesRouter from './routes/clientes.js';
import aparelhosRouter from './routes/aparelhos.js';
import tecnicosRouter from './routes/tecnicos.js';
import ordensServicoRouter from './routes/ordensServico.js';


import { logger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();


const origens = (
  process.env.CORS_ORIGIN ??
  'http://localhost:5500,http://127.0.0.1:5500'
).split(',');

app.use(cors({
  origin: origens
}));


// Middlewares globais
app.use(express.json());
app.use(logger);

// Rota inicial
app.get('/', (req, res) => {
  res.json({
    api: 'Sistema de Assistência Técnica',
    versao: '1.0.0',
    rotas: [
      '/clientes',
      '/aparelhos',
      '/tecnicos',
      '/ordens-servico'
    ]
  });
});

// Rotas da API
app.use('/clientes', clientesRouter);
app.use('/aparelhos', aparelhosRouter);
app.use('/tecnicos', tecnicosRouter);
app.use('/ordens-servico', ordensServicoRouter);


// Rota não encontrada
app.use((req, res) => {
  res.status(404).json({
    erro: `Rota ${req.method} ${req.url} não existe`
  });
});

// Tratamento de erros
app.use(errorHandler);

export default app;
