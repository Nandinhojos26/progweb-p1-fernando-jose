
import { Router } from 'express';
import { ordemServicoController } from '../controllers/ordemServicoController.js';

const router = Router();

router.get('/', ordemServicoController.listar);
router.get('/:id', ordemServicoController.buscarPorId);
router.post('/', ordemServicoController.criar);
router.put('/:id', ordemServicoController.atualizar);
router.delete('/:id', ordemServicoController.remover);

export default router;
