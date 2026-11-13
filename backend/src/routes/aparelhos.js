
import { Router } from 'express';
import { aparelhoController } from '../controllers/aparelhoController.js';

const router = Router();

router.get('/', aparelhoController.listar);

router.get('/:id', aparelhoController.buscarPorId);

router.post('/', aparelhoController.criar);

router.put('/:id', aparelhoController.atualizar);

router.delete('/:id', aparelhoController.remover);

export default router;
