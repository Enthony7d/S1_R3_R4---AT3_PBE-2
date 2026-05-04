export class Pedido {
    #id;
    #clienteId;
    #subTotal;
    #status;

    constructor(clienteId, subTotal, status, id = null) {
        this.clienteId = clienteId;
        this.subTotal = subTotal;
        this.status = status;
        this.id = id;
    }

    get id() { return this.#id; }
    set id(value) {
        if (value && value <= 0) throw new Error("ID inválido");
        this.#id = value;
    }

    get clienteId() { return this.#clienteId; }
    set clienteId(value) {
        if (!value || value <= 0) throw new Error("ClienteId inválido");
        this.#clienteId = value;
    }

    get subTotal() { return this.#subTotal; }
    set subTotal(value) {
        if (value < 0) throw new Error("Subtotal inválido");
        this.#subTotal = value;
    }

    get status() { return this.#status; }
    set status(value) {
        if (!value) throw new Error("Status obrigatório");
        this.#status = value;
    }

    static criar(dados) {
        return new Pedido(dados.clienteId, 0, dados.status);
    }
}