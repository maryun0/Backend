// Evento.js
export default class Evento {
    #codigo;
    #Sobre_Evento;
    #Nome_Evento;
    #Data_Hora;
    #Local_Evento;
    #Preco;
    #Quantidade_ingresso;
    #telefone;
    #email;

    constructor(codigo = 0, Sobre_Evento = "", Nome_Evento = "", Data_Hora = "", Local_Evento = "", Preco = "", Quantidade_ingresso = "", telefone = "", email = "") {
        this.#codigo = codigo;
        this.#Sobre_Evento = Sobre_Evento;
        this.#Nome_Evento = Nome_Evento;
        this.#Data_Hora = Data_Hora;
        this.#Local_Evento = Local_Evento;
        this.#Preco = Preco;
        this.#Quantidade_ingresso = Quantidade_ingresso;
        this.#telefone = telefone;
        this.#email = email;
    }

    // Getters
    get codigo() {
        return this.#codigo;
    }

    get Sobre_Evento() {
        return this.#Sobre_Evento;
    }

    get Nome_Evento() {
        return this.#Nome_Evento;
    }

    get Data_Hora() {
        return this.#Data_Hora;
    }

    get Local_Evento() {
        return this.#Local_Evento;
    }

    get Preco() {
        return this.#Preco;
    }

    get Quantidade_ingresso() {
        return this.#Quantidade_ingresso;
    }

    get telefone() {
        return this.#telefone;
    }

    get email() {
        return this.#email;
    }

    // Setters
    set codigo(newValue) {
        this.#codigo = newValue;
    }

    set Sobre_Evento(newValue) {
        this.#Sobre_Evento = newValue;
    }

    set Nome_Evento(newValue) {
        this.#Nome_Evento = newValue;
    }

    set Data_Hora(newValue) {
        this.#Data_Hora = newValue;
    }

    set Local_Evento(newValue) {
        this.#Local_Evento = newValue;
    }

    set Preco(newValue) {
        this.#Preco = newValue;
    }

    set Quantidade_ingresso(newValue) {
        this.#Quantidade_ingresso = newValue;
    }

    set telefone(newValue) {
        this.#telefone = newValue;
    }

    set email(newValue) {
        this.#email = newValue;
    }

    // Método para representar o objeto Evento como string
    toString() {
        return `Evento [${this.#codigo}]: ${this.#Nome_Evento}, Data: ${this.#Data_Hora}`;
    }

    // Método para converter o objeto Evento para um formato JSON
    toJSON() {
        return {
            codigo: this.#codigo,
            Sobre_Evento: this.#Sobre_Evento,
            Nome_Evento: this.#Nome_Evento,
            Data_Hora: this.#Data_Hora,
            Local_Evento: this.#Local_Evento,
            Preco: this.#Preco,
            Quantidade_ingresso: this.#Quantidade_ingresso,
            telefone: this.#telefone,
            email: this.#email
        };
    }
}
