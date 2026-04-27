import { Cliente } from "../models/Cliente.js";
import { Endereco } from "../models/Endereco.js";
import { limparNumero } from "../utils/limparNumero.js";
import clienteRepository from "../repositories/clienteRepository.js";

const clienteController = {

    buscarCep: async (cep) => {
        const cepLimpo = limparNumero(cep);

        const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
        const data = await response.json();

        if (data.erro) {
            throw new Error("CEP inválido");
        }

        return {
            cep: cepLimpo,
            logradouro: data.logradouro,
            bairro: data.bairro,
            cidade: data.localidade,
            uf: data.uf
        };
    },

    criar: async (req, res) => {
        try {
            const { nome, cpf, cep, numero, complemento, telefones } = req.body;

            const data = await clienteController.buscarCep(cep);

            const endereco = new Endereco(
                data.cep,
                data.logradouro,
                numero,
                complemento,
                data.bairro,
                data.cidade,
                data.uf
            );

            const telefonesFormatados = telefones.map(t =>
                typeof t === "string" ? { numero: t } : t
            );

            const cliente = Cliente.criar({
                nome,
                cpf,
                endereco,
                telefones: telefonesFormatados
            });

            const result = await clienteRepository.criar(cliente);

            res.status(201).json({ result });

        } catch (error) {
            res.status(500).json({ errorMessage: error.message });
        }
    },

    editar: async (req, res) => {
        try {
            const id = Number(req.query.id);
            const { nome, cpf, cep, numero, complemento, telefones } = req.body;

            const data = await clienteController.buscarCep(cep);

            const endereco = new Endereco(
                data.cep,
                data.logradouro,
                numero,
                complemento,
                data.bairro,
                data.cidade,
                data.uf
            );

            const telefonesFormatados = telefones.map(t =>
                typeof t === "string" ? { numero: t } : t
            );

            const cliente = Cliente.editar({
                nome,
                cpf,
                endereco,
                telefones: telefonesFormatados
            }, id);

            const result = await clienteRepository.editar(cliente);

            res.status(200).json({ result });

        } catch (error) {
            res.status(500).json({ errorMessage: error.message });
        }
    },

    selecionar: async (req, res) => {
        try {
            const result = await clienteRepository.selecionar();
            res.status(200).json({ result });

        } catch (error) {
            res.status(500).json({ errorMessage: error.message });
        }
    },

    deletar: async (req, res) => {
        try {
            const id = Number(req.params.id);
            const result = await clienteRepository.deletar(id);
            res.status(200).json({ result });

        } catch (error) {
            res.status(500).json({ errorMessage: error.message });
        }
    }
};

export default clienteController;