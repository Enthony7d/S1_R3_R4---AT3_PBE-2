import { Router } from "express";
const routes = Router();

import categoriaRoutes from "./categoriaRoutes.js";
import produtoRoutes from "./produtoRoutes.js";
import clienteRoutes from "./clienteRoutes.js"; 
import pedidoRoutes from "./pedidoRoutes.js";
import itensPedidoRoutes from "./itensPedidoRoutes.js"; 

routes.use('/categorias', categoriaRoutes);
routes.use('/produtos', produtoRoutes);
routes.use('/clientes', clienteRoutes); 
routes.use('/pedidos', pedidoRoutes);
routes.use('/itens', itensPedidoRoutes); 

export default routes;