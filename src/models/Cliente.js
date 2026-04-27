import { Endereco } from "./Endereco.js";

export class Cliente {
    #id;
    #nome;
    #cpf;
    #endereco;
    #telefones;
    #dataCad;

    constructor(nome, cpf, endereco, telefones = [], id = null) {
        this.nome = nome;
        this.cpf = cpf;
        this.endereco = endereco;
        this.telefones = telefones;
        this.id = id;
    }

    get id() { return this.#id; }
    set id(v) {
        if (v && v <= 0) throw new Error("ID inválido");
        this.#id = v;
    }

    get nome() { return this.#nome; }
    set nome(v) {
        this.validarNome(v);
        this.#nome = v;
    }

    get cpf() { return this.#cpf; }
    set cpf(v) {
        this.validarCpf(v);
        this.#cpf = v;
    }

    get endereco() { return this.#endereco; }
    set endereco(v) {
        if (!(v instanceof Endereco)) {
            throw new Error("Endereço inválido");
        }
        this.#endereco = v;
    }

    get telefones() { return this.#telefones; }
    set telefones(v) {
        if (!Array.isArray(v)) {
            throw new Error("Telefones inválidos");
        }
        this.#telefones = v;
    }

    validarNome(value) {
        if (!value || value.trim().length < 3 || value.trim().length > 100) {
            throw new Error("Nome deve ter entre 3 e 100 caracteres");
        }
    }

    validarCpf(value) {
        if (!value || value.length !== 11) {
            throw new Error("CPF inválido");
        }
    }

    static criar(dados) {
        return new Cliente(
            dados.nome,
            dados.cpf,
            dados.endereco,
            dados.telefones,
            null
        );
    }

    static editar(dados, id) {
        return new Cliente(
            dados.nome,
            dados.cpf,
            dados.endereco,
            dados.telefones,
            id
        );
    }
}