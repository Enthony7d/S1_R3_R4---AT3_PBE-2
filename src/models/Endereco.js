export class Endereco {
    #cep;
    #logradouro;
    #numero;
    #complemento;
    #bairro;
    #cidade;
    #uf;

    constructor(cep, logradouro, numero, complemento, bairro, cidade, uf) {
        this.cep = cep;
        this.logradouro = logradouro;
        this.numero = numero;
        this.complemento = complemento;
        this.bairro = bairro;
        this.cidade = cidade;
        this.uf = uf;
    }

    get cep() { return this.#cep; }
    set cep(v) {
        this.#validarCep(v);
        this.#cep = v;
    }

    get logradouro() { return this.#logradouro; }
    set logradouro(v) { this.#logradouro = v; }

    get numero() { return this.#numero; }
    set numero(v) { this.#numero = v; }

    get complemento() { return this.#complemento; }
    set complemento(v) { this.#complemento = v; }

    get bairro() { return this.#bairro; }
    set bairro(v) { this.#bairro = v; }

    get cidade() { return this.#cidade; }
    set cidade(v) { this.#cidade = v; }

    get uf() { return this.#uf; }
    set uf(v) { this.#uf = v; }

    #validarCep(value) {
        if (!value || value.length !== 8) {
            throw new Error("CEP inválido");
        }
    }

    static criar(dados) {
        return new Endereco(
            dados.cep,
            dados.logradouro,
            dados.numero,
            dados.complemento,
            dados.bairro,
            dados.cidade,
            dados.uf
        );
    }
}