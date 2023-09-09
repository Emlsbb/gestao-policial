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

//Exportação de rotas
module.exports = {routes};
