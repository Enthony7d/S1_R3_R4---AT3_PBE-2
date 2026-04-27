import { connection } from "../configs/Database.js";

const clienteRepository = {

    async criar(cliente) {
        const conn = await connection.getConnection();
        await conn.beginTransaction();

        try {
            const [result] = await conn.execute(
                `INSERT INTO cliente (nome, cpf) VALUES (?, ?)`,
                [cliente.nome, cliente.cpf]
            );

            const clienteId = result.insertId;

            const e = cliente.endereco;

            await conn.execute(
                `INSERT INTO endereco 
                (cliente_id, cep, logradouro, numero, complemento, bairro, cidade, uf)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    clienteId,
                    e.cep,
                    e.logradouro,
                    e.numero,
                    e.complemento,
                    e.bairro,
                    e.cidade,
                    e.uf
                ]
            );

            for (const t of cliente.telefones) {
                await conn.execute(
                    `INSERT INTO telefone (cliente_id, numero) VALUES (?, ?)`,
                    [clienteId, t.numero]
                );
            }

            await conn.commit();
            conn.release();

            return { id: clienteId };

        } catch (error) {
            await conn.rollback();
            conn.release();
            throw error;
        }
    },

    async editar(cliente) {
        const conn = await connection.getConnection();
        await conn.beginTransaction();

        try {
            await conn.execute(
                `UPDATE cliente SET nome=?, cpf=? WHERE id=?`,
                [cliente.nome, cliente.cpf, cliente.id]
            );

            const e = cliente.endereco;

            await conn.execute(
                `UPDATE endereco 
                 SET cep=?, logradouro=?, numero=?, complemento=?, bairro=?, cidade=?, uf=? 
                 WHERE cliente_id=?`,
                [
                    e.cep,
                    e.logradouro,
                    e.numero,
                    e.complemento,
                    e.bairro,
                    e.cidade,
                    e.uf,
                    cliente.id
                ]
            );

            await conn.execute(
                `DELETE FROM telefone WHERE cliente_id=?`,
                [cliente.id]
            );

            for (const t of cliente.telefones) {
                await conn.execute(
                    `INSERT INTO telefone (cliente_id, numero) VALUES (?, ?)`,
                    [cliente.id, t.numero]
                );
            }

            await conn.commit();
            conn.release();

            return { message: "Cliente atualizado com sucesso" };

        } catch (error) {
            await conn.rollback();
            conn.release();
            throw error;
        }
    },

    async deletar(id) {
        const conn = await connection.getConnection();
        await conn.beginTransaction();

        try {
            await conn.execute(`DELETE FROM telefone WHERE cliente_id=?`, [id]);
            await conn.execute(`DELETE FROM endereco WHERE cliente_id=?`, [id]);
            const [result] = await conn.execute(`DELETE FROM cliente WHERE id=?`, [id]);

            await conn.commit();
            conn.release();

            return result;

        } catch (error) {
            await conn.rollback();
            conn.release();
            throw error;
        }
    },

    async selecionar() {
        const [clientes] = await connection.execute(`
            SELECT id, nome, cpf, dataCad
            FROM cliente
        `);

        const resultado = [];

        for (const c of clientes) {

            const [enderecoRows] = await connection.execute(
                `SELECT cep, logradouro, numero, complemento, bairro, cidade, uf
                 FROM endereco
                 WHERE cliente_id = ?`,
                [c.id]
            );

            const endereco = enderecoRows[0];

            const [telefones] = await connection.execute(
                `SELECT numero FROM telefone WHERE cliente_id = ?`,
                [c.id]
            );

            resultado.push({
                id: c.id,
                nome: c.nome,
                cpf: c.cpf,
                dataCad: c.dataCad,

                endereco: endereco ? {
                    cep: endereco.cep,
                    logradouro: endereco.logradouro,
                    numero: endereco.numero,
                    complemento: endereco.complemento,
                    bairro: endereco.bairro,
                    cidade: endereco.cidade,
                    uf: endereco.uf
                } : null,

                telefones: telefones.map(t => ({
                    numero: t.numero
                }))
            });
        }

        return resultado;
    }
};

export default clienteRepository;