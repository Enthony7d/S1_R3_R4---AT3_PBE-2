import { connection } from '../configs/Database.js';

const itensPedidoRepository = {

    selecionar: async () => {
    const sql = `SELECT * FROM itens_pedidos`;
    const [rows] = await connection.execute(sql);
    return rows;
},

    criar: async (item) => {
        const sql = `
            INSERT INTO itens_pedidos (PedidoId, ProdutoId, Quantidade, ValorItem)
            VALUES (?, ?, ?, ?)
        `;

        const [rows] = await connection.execute(sql, [
            item.pedidoId,
            item.produtoId,
            item.quantidade,
            item.valorItem
        ]);

        return rows;
    },

    atualizar: async (id, quantidade) => {
        const sql = `
            UPDATE itens_pedidos SET Quantidade=? WHERE Id=?
        `;

        const [rows] = await connection.execute(sql, [quantidade, id]);
        return rows;
    },

    deletar: async (id) => {
        const sql = `DELETE FROM itens_pedidos WHERE Id=?`;

        const [rows] = await connection.execute(sql, [id]);
        return rows;
    }
};

export default itensPedidoRepository;