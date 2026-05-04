import { Router } from "express";
import itensPedidoController from "../controllers/itensPedidoController.js";

const router = Router();

router.post('/', itensPedidoController.adicionar);
router.put('/:id', itensPedidoController.editar);
router.delete('/:id', itensPedidoController.deletar);
router.get('/', itensPedidoController.selecionar);

export default router;