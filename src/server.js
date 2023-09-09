//Configurações da conexão com o servidor
require('./database');

//Requisitando express para criação de rotas
const express = require('express');
const { routes } = require('./routes');

//Instanciando as rotas
const server = express();

//Direcionando para utilização em formato json
server.use(express.json());
server.use(routes);

server.listen(8080, () => {
    console.log('🚀 Server inicado http://localhost:8080');
});
