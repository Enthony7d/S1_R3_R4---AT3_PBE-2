import { ItensPedidos } from "../models/ItensPedidos.js";
import itensPedidoRepository from "../repositories/itensPedidoRepository.js";
import pedidoRepository from "../repositories/pedidoRepository.js";

const itensPedidoController = {

    selecionar: async (req, res) => {
    try {
        const result = await itensPedidoRepository.selecionar();
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
},

    adicionar: async (req, res) => {
        try {
            const item = ItensPedidos.criar(req.body);

            await itensPedidoRepository.criar(item);
            await pedidoRepository.atualizarSubtotal(item.pedidoId);

            res.status(201).json({ msg: "Item adicionado" });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    editar: async (req, res) => {
        try {
            const id = Number(req.params.id);
            const { quantidade, pedidoId } = req.body;

            if (!quantidade || !pedidoId) {
                return res.status(400).json({ error: "Dados obrigatórios" });
            }

            await itensPedidoRepository.atualizar(id, quantidade);
            await pedidoRepository.atualizarSubtotal(pedidoId);

            res.json({ msg: "Item atualizado" });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    deletar: async (req, res) => {
        try {
            const id = Number(req.params.id);
            const { pedidoId } = req.body;

            if (!pedidoId) {
                return res.status(400).json({ error: "PedidoId obrigatório" });
            }

            await itensPedidoRepository.deletar(id);
            await pedidoRepository.atualizarSubtotal(pedidoId);

            res.json({ msg: "Item removido" });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

export default itensPedidoController;