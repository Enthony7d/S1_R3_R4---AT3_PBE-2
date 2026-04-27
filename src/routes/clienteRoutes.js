import { Router } from "express";
import clienteController from "../controllers/clienteController.js";

const clienteRoutes = Router();

clienteRoutes.post('/', clienteController.criar);
clienteRoutes.get('/', clienteController.selecionar);
clienteRoutes.delete('/:id', clienteController.deletar);
clienteRoutes.put('/', clienteController.editar);

export default clienteRoutes;