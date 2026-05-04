export class ItensPedidos {
    #id;
    #pedidoId;
    #produtoId;
    #quantidade;
    #valorItem;

    constructor(pedidoId, produtoId, quantidade, valorItem, id = null) {
        this.pedidoId = pedidoId;
        this.produtoId = produtoId;
        this.quantidade = quantidade;
        this.valorItem = valorItem;
        this.id = id;
    }

    get id() { return this.#id; }
    set id(value) { this.#id = value; }

    get pedidoId() { return this.#pedidoId; }
    set pedidoId(value) {
        if (!value) throw new Error("PedidoId obrigatório");
        this.#pedidoId = value;
    }

    get produtoId() { return this.#produtoId; }
    set produtoId(value) {
        if (!value) throw new Error("ProdutoId obrigatório");
        this.#produtoId = value;
    }

    get quantidade() { return this.#quantidade; }
    set quantidade(value) {
        if (value <= 0) throw new Error("Quantidade inválida");
        this.#quantidade = value;
    }

    get valorItem() { return this.#valorItem; }
    set valorItem(value) {
        if (value <= 0) throw new Error("Valor inválido");
        this.#valorItem = value;
    }

    static criar(dados) {
        return new ItensPedidos(
            dados.pedidoId,
            dados.produtoId,
            dados.quantidade,
            dados.valorItem
        );
    }
}