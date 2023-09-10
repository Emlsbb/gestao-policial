//Criação do Router e requisição dos controllers:
const { Router } = require('express')

//Requisitando controllers
const ServidorController = require('./controller/servidor-controller');

//Rotas com cruds de cada tabela:
const routes = Router();

//Servidores
routes.post('/servidor', ServidorController.create); //rota funcionando
routes.get('/servidor', ServidorController.findAll);
routes.put('/servidor:id', ServidorController.update);
routes.delete('/servidor:id', ServidorController.delete);

//Tarefas
routes.post('/tarefas',TarefaController.create); //rota funcionando
routes.get('/tarefas',TarefaController.findAll);
routes.put('/tarefas/id', TarefaController.update);
routes.delete('/tarefas/id',TarefaController.delete);

//Procedimentos
routes.post('/procedimentos',ProcedimentoController.create); //rota funcionando
routes.get('/procedimentos',ProcedimentoController.findAll);
routes.put('/procedimentos/id',ProcedimentoController.update);
routes.delete('/procedimentos/id',ProcedimentoController.delete);

//Solicitações
routes.post('/solicitacoes',SolicitacaoController.create); //rota funcionando
routes.get('/solicitacoes',SolicitacaoController.findAll);
routes.put('/solicitacoes/id',SolicitacaoController.update);
routes.delete('/solicitacoes/id',SolicitacaoController.delete);


//Exportação de rotas
module.exports = {routes};
