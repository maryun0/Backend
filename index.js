import Evento from "./Modelos/Evento.js";
import EventoDAO from "./Persistencia/EventoDAO.js";

const evento = new Evento(0, "Descrição do Evento", "Nome do Evento", "2022-01-01 10:00", "Local do Evento", "100.00", "100", "(11)92566-8834", "email@exemplo.com");

evento.gravar().then(() =>{
    console.log("Evento gravado com sucesso!");
}).catch((erro) => {
    console.log(erro);
});