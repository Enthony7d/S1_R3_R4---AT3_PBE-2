import { Pedido } from "../models/Pedido.js";
import pedidoRepository from "../repositories/pedidoRepository.js";

const pedidoController = {

    selecionar: async (req, res) => {
    try {
        const result = await pedidoRepository.selecionar();
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
},

    criar: async (req, res) => {
        try {
            const { clienteId, status } = req.body;

            if (!clienteId || !status) {
                return res.status(400).json({ error: "Dados obrigatórios" });
            }

            const pedido = Pedido.criar({ clienteId, status });

            const result = await pedidoRepository.criar(pedido);

            res.status(201).json(result);

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    atualizarStatus: async (req, res) => {
        try {
            const id = Number(req.params.id);
            const { status } = req.body;

            if (!status) {
                return res.status(400).json({ error: "Status obrigatório" });
            }

            const result = await pedidoRepository.atualizarStatus(id, status);

            res.json(result);

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

export default pedidoController;