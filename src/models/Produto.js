export class Produto {
    #id;
    #idCategoria;
    #nome;
    #valor;
    #caminhoImagem;
    #dataCad;

    constructor(pIdCategoria, pNome, pValor, pCaminhoImagem, pId = null) {
        this.idCategoria = pIdCategoria;
        this.nome = pNome;
        this.valor = pValor;
        this.caminhoImagem = pCaminhoImagem;
        this.id = pId;
    }

    get id() {
        return this.#id;
    }

    set id(value) {
        this.#validarId(value);
        this.#id = value;
    }

    get idCategoria() {
        return this.#idCategoria;
    }

    set idCategoria(value) {
        this.#validarIdCategoria(value);
        this.#idCategoria = value;
    }

    get nome() {
        return this.#nome;
    }

    set nome(value) {
        this.#validarNome(value);
        this.#nome = value;
    }

    get valor() {
        return this.#valor;
    }

    set valor(value) {
        this.#validarValor(value);
        this.#valor = value;
    }

    get caminhoImagem() {
        return this.#caminhoImagem;
    }

    set caminhoImagem(value) {
        this.#validarPathImagem(value);
        this.#caminhoImagem = value;
    }

    

    #validarId(value) {
        if (value && value <= 0) {
            throw new Error('ID inválido');
        }
    }

    #validarIdCategoria(value) {
        if (!value || value <= 0) {
            throw new Error('IdCategoria é obrigatório e deve ser válido');
        }
    }

    #validarNome(value) {
        if (!value || value.trim().length < 3 || value.trim().length > 100) {
            throw new Error('Nome deve ter entre 3 e 100 caracteres');
        }
    }

    #validarValor(value) {
        if (value == null || value <= 0) {
            throw new Error('Valor deve ser maior que zero');
        }
    }

    #validarPathImagem(value) {
        if (!value || value.trim().length < 3) {
            throw new Error('Caminho da imagem é obrigatório');
        }
    }

   

    static criar(dados) {
        return new Produto(
            dados.idCategoria,
            dados.nome,
            dados.valor,
            dados.caminhoImagem,
            null
        );
    }

    static editar(dados, id) {
        return new Produto(
            dados.idCategoria,
            dados.nome,
            dados.valor,
            dados.caminhoImagem,
            id
        );
    }
}