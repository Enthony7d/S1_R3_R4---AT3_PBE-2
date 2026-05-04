import { Router } from "express";
import pedidoController from "../controllers/pedidoController.js";

const router = Router();

router.post('/', pedidoController.criar);
router.put('/:id/status', pedidoController.atualizarStatus);
router.get('/', pedidoController.selecionar);

export default router;