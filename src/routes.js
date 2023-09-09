//Criação do Router e requisição dos controllers:
const { Router } = require('express')

//Requisitando controllers
const ServidorController = require('./controller/servidor-controller');

//Rotas com cruds de cada tabela:
const routes = Router();

//Servidores
routes.post('/servidor', ServidorController.create); //rota funcionando
routes.get('/merendeira', ServidorController.findAll);
routes.put('/merendeiraid', ServidorController.update);
routes.delete('/merendeiraid', ServidorController.delete);

//Exportação de rotas
module.exports = {routes};
