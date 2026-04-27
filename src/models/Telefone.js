export class Telefone {
    #numero;

    constructor(numero) {
        this.numero = numero;
    }

    get numero() { return this.#numero; }

    set numero(v) {
        this.#validarTelefone(v);
        this.#numero = v;
    }

    #validarTelefone(value) {
        if (!value || value.length < 8) {
            throw new Error("Telefone inválido");
        }
    }

    static criar(numero) {
        return new Telefone(numero);
    }
}