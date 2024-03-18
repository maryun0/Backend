
import { Router } from 'express';
import EventoCtrl from '../Controles/EventoCtrl.js';

const rotaEvento = new Router();
const eveCtrl = new EventoCtrl();

rotaEvento
.get('/', eveCtrl.consultar)
.get('/:termo', eveCtrl.consultar)  //atribuindo a função consultar como parâmetro do que executar quando receber um método get na rota
.post('/', eveCtrl.gravar)
.put('/:id', eveCtrl.atualizar)
.patch('/:id', eveCtrl.atualizar)
.delete('/:id', eveCtrl.excluir);


export default rotaEvento;