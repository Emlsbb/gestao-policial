//Criação do Router 
const { Router } = require('express')

//Requisitando Controllers
const { GestorController } = require('./controller/gestor-controller');
const { ProcedimentoController } = require('./controller/procedimento-controller');
const { TarefaController } = require('./controller/tarefa-controller');
const { SolicitacaoController } = require('./controller/solicitacao-controller');
const { DashboardController } = require("./controller/dashboard-controller");

//Requisitando middlewares de autenticação
const { gestorAuth } = require('./middleware/gestor-auth-middleware');

//Requisitando rotas
const routes = Router();

//Tornando callback function
const gestorController = new GestorController();
const procedimentoController = new ProcedimentoController();
const tarefaController = new TarefaController();
const solicitacaoController = new SolicitacaoController();
const dashboardController = new DashboardController();

//Gestores
routes.post('/gestores', gestorController.create);
routes.post('/gestores/login', gestorController.login);
routes.get('/gestores', gestorController.findAll);
routes.put('/gestores/:id', gestorController.update);
routes.delete('/gestores/:id', gestorController.delete);


//Procedimentos gestor
routes.post('/procedimentos', gestorAuth, procedimentoController.create);
routes.get('/procedimentos', gestorAuth, procedimentoController.findAll);
routes.put('/procedimentos/:id', gestorAuth, procedimentoController.update);
routes.delete('/procedimentos/:id', gestorAuth, procedimentoController.delete);

//Tarefas gestor
routes.post('/tarefas', gestorAuth, tarefaController.create);
routes.get('/tarefas', gestorAuth, tarefaController.findAll);
routes.put('/tarefas/:id', gestorAuth, tarefaController.update);
routes.delete('/tarefas/:id', gestorAuth, tarefaController.delete);

//Solicitações gestor
routes.post('/solicitacoes', gestorAuth, solicitacaoController.create);
routes.get('/solicitacoes', gestorAuth, solicitacaoController.findAll);
routes.put('/solicitacoes/:id', gestorAuth, solicitacaoController.update);
routes.delete('/solicitacoes/:id', gestorAuth, solicitacaoController.delete);

//Dashboard
routes.get("/dashboard", gestorAuth, dashboardController.index);

module.exports = { routes };
