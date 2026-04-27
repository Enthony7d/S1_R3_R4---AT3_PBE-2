import { Router } from "express";
import produtoController from "../controllers/produtoController.js";
import upload from "../../upload.js";

const produtoRoutes = Router();

produtoRoutes.post('/', upload.single('imagem'), produtoController.criar);
produtoRoutes.put('/', upload.single('imagem'), produtoController.atualizar);
produtoRoutes.delete('/:id', produtoController.deletar);
produtoRoutes.get('/', produtoController.selecionar);

export default produtoRoutes;