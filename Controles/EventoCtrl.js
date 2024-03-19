import Evento from "../Modelos/Evento.js";

export default class EventoCtrl{

    //Esta Classe terá a responsabilidade de traduzir pedidos HTTP em 
    //comandos internos da aplicação
    //A nossa aplicação sabe gravar, atualizar, excluir e consultar clientes 
    //no banco de dados

    //Será necessário manipular requisições HTTP
    //Requisições HTTP (GET, POST, PUT ou PATCH, DELETE)

    //Camada de controle será síncrona, então iremos resolver os métodos assíncronos (promises)

    gravar(requisicao, resposta){

        //prepar o método gravar para produzir respostas no formato JSON
        resposta.type('application/json');

        //HTTP gravar um cliente é enviar uma requisição do tipo POST
        //trazendo dados no formato JSON
        if(requisicao.method === "POST" && requisicao.is('application/json')){
            const dados = requisicao.body; //extrair dados do corpo da requisição
            const Sobre_Evento = dados.Sobre_Evento;
            const Nome_Evento = dados.Nome_Evento;
            const Data_Hora = dados.Data_Hora;
            const Local_Evento = dados.Local_Evento;
            const Preco = dados.Preco;
            const Quantidade_ingresso = dados.Quantidade_ingresso;
            const telefone = dados.telefone;
            const email = dados.email;

            //pseudo validação nos dados
            if (Sobre_Evento && Nome_Evento && Data_Hora && Local_Evento && Preco && Quantidade_ingresso && telefone && email){
                const evento = new Evento(0, Sobre_Evento, Nome_Evento, Data_Hora, Local_Evento, Preco, Quantidade_ingresso, telefone, email);
                evento.gravar().then(()=>{
                    resposta.status(201);
                    resposta.json({
                        "status":true,
                        "mensagem": "Evento gravado com sucesso!",
                        "id_evento": evento.id
                    });
                }).catch((erro) =>{
                    resposta.status(500);
                    resposta.json({
                        "status":false,
                        "mensagem": "Não foi possível armazenar o evento! " + erro.message
                    })
                });
            }
            else{
                resposta.status(400);
                resposta.json({
                    "status":false,
                    "mensagem": "Por favor, informe todos os dados do evento, conforme documentação da API"
                });
            }
        }
        else{
            resposta.status(405);
            resposta.json({
                "status":false,
                "mensagem": "Requisição inválida! Esperando o método POST e dados no formato JSON para gravar um evento!"
            })
        }
    }

    atualizar(requisicao, resposta){
        resposta.type('application/json');
        if ((requisicao.method === "PATCH" || requisicao.method === "PUT") && requisicao.is('application/json')){
            const dados = requisicao.body; //extrair dados do corpo da requisição
            //o código será extraído da url, exemplo: http://localhost:3000/cliente/1  1 é o código
            const id = requisicao.params.id;
            const Sobre_Evento = dados.Sobre_Evento;
            const Nome_Evento = dados.Nome_Evento;
            const Data_Hora = dados.Data_Hora;
            const Local_Evento = dados.Local_Evento;
            const Preco = dados.Preco;
            const Quantidade_ingresso = dados.Quantidade_ingresso;
            const telefone = dados.telefone;
            const email = dados.email;
            if (id && id > 0 && Sobre_Evento && Nome_Evento && Data_Hora && Local_Evento && Preco && Quantidade_ingresso && telefone && email)
            {
                const evento = new Evento(id, Sobre_Evento, Nome_Evento, Data_Hora, Local_Evento, Preco, Quantidade_ingresso, telefone, email);
                evento.atualizar()
                .then(()=>{
                    resposta.status(200);
                    resposta.json({
                        "status":true,
                        "mensagem": "Evento atualizado com sucesso!",
                    })
                })
                .catch((erro) =>{
                    resposta.status(500);
                    resposta.json({
                        "status":false,
                        "mensagem": "Não foi possível atualizar o evento! " + erro.message
                    })
                });
            }
            else{
                resposta.status(400);
                resposta.json({
                    "status":false,
                    "mensagem": "Por favor, informe todos os dados do cliente, conforme documentação da API"
                })
            }
        }
        else{
            resposta.status(405);
            resposta.json({
                "status":false,
                "mensagem": "Requisição inválida! Esperando o método PATCH, PUT e dados no formato JSON para atualizar um cliente!"
            })
        }
    }

    excluir(requisicao, resposta){
        resposta.type('application/json');
        if (requisicao.method === "DELETE"){
            //o código do cliente que será excluído será extraído da url
            const id = requisicao.params.id;
            if (id && id > 0){
                const evento = new Evento(id);
                evento.excluir()
                .then(()=>{
                    resposta.status(200);
                    resposta.json({
                        "status":true,
                        "mensagem": "Evento excluído com sucesso!",
                    })
                })
                .catch((erro) =>{
                    resposta.status(500);
                    resposta.json({
                        "status":false,
                        "mensagem": "Não foi possível excluir o evento! " + erro.message
                    })
                })
            }
            else{
                resposta.status(400);
                resposta.json({
                    "status":false,
                    "mensagem": "Por favor, informe o código do evento que deseja excluir, conforme documentação da API"
                })
            }
        }
        else{
            resposta.status(405);
            resposta.json({
                "status":false,
                "mensagem": "Requisição inválida! Esperando o método DELETE para excluir um evento!"
            })
        }
    }

    consultar(requisicao, resposta){
        resposta.type('application/json');
        if (requisicao.method === "GET"){
            const termoDePesquisa = requisicao.params.termo;
            const evento = new Evento(0);
            evento.consultar(termoDePesquisa)
            .then((eventos)=>{
                resposta.status(200);
                resposta.json(eventos);
            })
            .catch((erro) =>{
                resposta.status(500);
                resposta.json({
                    "status":false,
                    "mensagem": "Não foi possível consultar os eventos! " + erro.message
                })
            })
        }
        else{
            resposta.status(405);
            resposta.json({
                "status":false,
                "mensagem": "Requisição inválida! Esperando o método GET para consultar os eventos!"
            })
        }
    }

}