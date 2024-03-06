import conectar from "../Persistencia/Conexao.js";
import Evento from "../Modelos/Evento.js";

export default class EventoDAO {
    async gravar(evento) {
        const conexao = await conectar();
        try {
            const sql = `INSERT INTO evento (sobre_evento, nome_evento, data_hora, local_evento, preco, quantidade_ingresso, telefone, email) 
                         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
            const parametros = [
                evento.Sobre_Evento,
                evento.Nome_Evento,
                evento.Data_Hora,
                evento.Local_Evento,
                evento.Preco,
                evento.Quantidade_ingresso,
                evento.telefone,
                evento.email,
            ];
            const [resultados] = await conexao.execute(sql, parametros);
            evento.codigo = resultados.insertId;
        } finally {
            if (conexao && conexao.release) conexao.release();
        }
    }

    async atualizar(evento) {
        const conexao = await conectar();
        try {
            const sql = `UPDATE evento SET sobre_evento = ?, nome_evento = ?, data_hora = ?, local_evento = ?, preco = ?, quantidade_ingresso = ?, telefone = ?, email = ? WHERE id = ?`;
            const parametros = [
                evento.Sobre_Evento,
                evento.Nome_Evento,
                evento.Data_Hora,
                evento.Local_Evento,
                evento.Preco,
                evento.Quantidade_ingresso,
                evento.telefone,
                evento.email,
                evento.codigo,
            ];
            await conexao.execute(sql, parametros);
        } finally {
            if (conexao && conexao.release) conexao.release();
        }
    }

    async excluir(evento) {
        const conexao = await conectar();
        try {
            const sql = `DELETE FROM evento WHERE id = ?`;
            const parametros = [evento.codigo];
            await conexao.execute(sql, parametros);
        } finally {
            if (conexao && conexao.release) conexao.release();
        }
    }

    async consultar(termoDePesquisa) {
        const conexao = await conectar();
        try {
            let sql = "";
            let parametros = [];
            if (isNaN(termoDePesquisa)) {
                sql = `SELECT * FROM evento WHERE nome_evento LIKE ?`;
                parametros = [`%${termoDePesquisa}%`];
            } else {
                sql = `SELECT * FROM evento WHERE id = ?`;
                parametros = [termoDePesquisa];
            }

            const [registros] = await conexao.execute(sql, parametros);
            return registros.map(registro => new Evento(
                registro.id,
                registro.sobre_evento,
                registro.nome_evento,
                registro.data_hora,
                registro.local_evento,
                registro.preco,
                registro.quantidade_ingresso,
                registro.telefone,
                registro.email
            ));
        } finally {
            if (conexao && conexao.release) conexao.release();
        }
    }
}
