//Criação do Router 
const { Router } = require('express')

//Requisitando Controllers
const { PmController } = require('./controller/policialmilitar-controller');
const { PcController } = require('./controller/policialcivil-controller');
const { GestorController } = require('./controller/gestor-controller');
const { ProcedimentoController } = require('./controller/procedimento-controller');
const { TarefaController } = require('./controller/tarefa-controller');
const { SolicitacaoController } = require('./controller/solicitacao-controller');

//Requisitando middlewares de autenticação
const { pmAuth } = require('./middleware/pm-auth-middleware');
const { pcAuth } = require('./middleware/pc-auth-middleware');
const { gestorAuth } = require('./middleware/gestor-auth-middleware');

//Requisitando rotas
const routes = Router();

//Tornando callback function
const pmController = new PmController();
const pcController = new PcController();
const gestorController = new GestorController();
const procedimentoController = new ProcedimentoController();
const tarefaController = new TarefaController();
const solicitacaoController = new SolicitacaoController();


//Policias militares
routes.post('/pms', pmController.create);
routes.post('/pms/login', pmController.login);
routes.get('/pms', pmController.findAll);
routes.put('/pms/:id', pmController.update);
routes.delete('/pms/:id', pmController.delete);

//Policias civis
routes.post('/pcs', pcController.create);
routes.post('/pcs/login', pcController.login);
routes.get('/pcs', pcController.findAll);
routes.put('/pcs/:id', pcController.update);
routes.delete('/pcs/:id', pcController.delete);

//Gestores
routes.post('/gestores', gestorController.create);
routes.post('/gestores/login', gestorController.login);
routes.get('/gestores', gestorController.findAll);
routes.put('/gestores/:id', gestorController.update);
routes.delete('/gestores/:id', gestorController.delete);

//Procedimentos policial militar
routes.post('/pms/procedimentos', pmAuth, procedimentoController.create);
routes.get('/pms/procedimentos', pmAuth, procedimentoController.findAll);
routes.put('/pms/procedimentos/:id', pmAuth, procedimentoController.update);
routes.delete('/pms/procedimentos/:id', pmAuth, procedimentoController.delete);

//Procedimentos policial civil
routes.post('/pcs/procedimentos', pcAuth, procedimentoController.create);
routes.get('/pcs/procedimentos', pcAuth, procedimentoController.findAll);
routes.put('/pcs/procedimentos/:id', pcAuth, procedimentoController.update);
routes.delete('/pcs/procedimentos/:id', pcAuth, procedimentoController.delete);

//Procedimentos gestor
routes.post('/gestores/procedimentos', gestorAuth, procedimentoController.create);
routes.get('/gestores/procedimentos', gestorAuth, procedimentoController.findAll);
routes.put('/gestores/procedimentos/:id', gestorAuth, procedimentoController.update);
routes.delete('/gestores/procedimentos/:id', gestorAuth, procedimentoController.delete);

//Tarefas policial militar
routes.post('/pms/tarefas', pmAuth, tarefaController.create);
routes.get('/pms/tarefas', pmAuth, tarefaController.findAll);
routes.put('/pms/tarefas/:id', pmAuth, tarefaController.update);
routes.delete('/pms/tarefas/:id', pmAuth, tarefaController.delete);

//Tarefas policial civil
routes.post('/pcs/tarefas', pcAuth, tarefaController.create);
routes.get('/pcs/tarefas', pcAuth, tarefaController.findAll);
routes.put('/pcs/tarefas/:id', pcAuth, tarefaController.update);
routes.delete('/pcs/tarefas/:id', pcAuth, tarefaController.delete);

//Tarefas gestor
routes.post('/gestores/tarefas', gestorAuth, tarefaController.create);
routes.get('/gestores/tarefas', gestorAuth, tarefaController.findAll);
routes.put('/gestores/tarefas/:id', gestorAuth, tarefaController.update);
routes.delete('/gestores/tarefas/:id', gestorAuth, tarefaController.delete);

//Solicitações policial militar
routes.post('/pms/solicitacoes', pmAuth, solicitacaoController.create);
routes.get('/pms/solicitacoes', pmAuth, solicitacaoController.findAll);
routes.put('/pms/solicitacoes/:id', pmAuth, solicitacaoController.update);
routes.delete('/pms/solicitacoes/:id', pmAuth, solicitacaoController.delete);

//Solicitações policial civil
routes.post('/pcs/solicitacoes', pcAuth, solicitacaoController.create);
routes.get('/pcs/solicitacoes', pcAuth, solicitacaoController.findAll);
routes.put('/pcs/solicitacoes/:id', pcAuth, solicitacaoController.update);
routes.delete('/pcs/solicitacoes/:id', pcAuth, solicitacaoController.delete);

//Solicitações gestor
routes.post('/gestor/solicitacoes', gestorAuth, solicitacaoController.create);
routes.get('/gestor/solicitacoes', gestorAuth, solicitacaoController.findAll);
routes.put('/gestor/solicitacoes/:id', gestorAuth, solicitacaoController.update);
routes.delete('/gestor/solicitacoes/:id', gestorAuth, solicitacaoController.delete);

module.exports = { routes };
