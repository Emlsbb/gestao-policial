//Criação do Router e requisição dos controllers:

const { Router } = require('express')

//Requisitando Controllers
const PmController = require('./controller/policialmilitar-controller');
const PcController = require('./controller/policialcivil-controller');
const GestorController = require('./controller/gestor-controller');
const TarefaController = require('./controller/tarefa-controller');
const ProcedimentoController = require('./controller/procedimento-controller');
const SolicitacaoController = require('./controller/solicitacao-controller');

const routes = Router();

//Rotas com cruds de cada tabela:
//Policias militares
routes.post('/pms',PmController.create); //rota funcionando
routes.get('/pms',PmController.findAll);
routes.put('/pms/:id',PmController.update);
routes.delete('/pms/:id',PmController.delete);

//Policias civis
routes.post('/pcs',PcController.create); //rota funcionando
routes.get('/pcs',PcController.findAll);
routes.put('/pcs/:id',PcController.update);
routes.delete('/pcs/:id',PcController.delete);

//Gestores
routes.post('/gestores',GestorController.create); //rota funcionando
routes.get('/gestores',GestorController.findAll);
routes.put('/gestores/:id',GestorController.update);
routes.delete('/gestores/:id',GestorController.delete);

//Procedimentos
routes.post('/procedimentos',ProcedimentoController.create); //rota funcionando
routes.get('/procedimentos',ProcedimentoController.findAll);
routes.put('/procedimentos/:id',ProcedimentoController.update);
routes.delete('/procedimentos/:id',ProcedimentoController.delete);

//Tarefas
routes.post('/tarefas',TarefaController.create); //rota funcionando
routes.get('/tarefas',TarefaController.findAll);
routes.put('/tarefas/:id', TarefaController.update);
routes.delete('/tarefas/:id',TarefaController.delete);

//Solicitações
routes.post('/solicitacoes',SolicitacaoController.create); //rota funcionando
routes.get('/solicitacoes',SolicitacaoController.findAll);
routes.put('/solicitacoes/:id',SolicitacaoController.update);
routes.delete('/solicitacoes/:id',SolicitacaoController.delete);

module.exports = {routes};
