import { connection } from '../configs/Database.js';

const pedidoRepository = {

    selecionar: async () => {
    const sql = `SELECT * FROM pedidos`;
    const [rows] = await connection.execute(sql);
    return rows;
},

    criar: async (pedido) => {
        const sql = `
            INSERT INTO pedidos (ClienteId, SubTotal, status)
            VALUES (?, ?, ?)
        `;

        const [rows] = await connection.execute(sql, [
            pedido.clienteId,
            pedido.subTotal,
            pedido.status
        ]);

        return rows;
    },

    atualizarStatus: async (id, status) => {
        const sql = `UPDATE pedidos SET status=? WHERE Id=?`;

        const [rows] = await connection.execute(sql, [status, id]);
        return rows;
    },

    atualizarSubtotal: async (pedidoId) => {
        const sql = `
            UPDATE pedidos
            SET SubTotal = (
                SELECT COALESCE(SUM(Quantidade * ValorItem), 0)
                FROM itens_pedidos
                WHERE PedidoId = ?
            )
            WHERE Id = ?
        `;

        await connection.execute(sql, [pedidoId, pedidoId]);
    }
};

export default pedidoRepository;