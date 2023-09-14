//Configurações da conexão com o servidor
require('./database');
require('dotenv').config();

//Requisitando express para criação de rotas
const express = require('express');
const cors = require('cors');
const { routes } = require('./routes');

//Instanciando o server
const server = express();
server.use(cors());

//Direcionando para utilização em formato json
server.use(express.json());

//Requisitando rotas
server.use(routes);

//Rodando servidor
const PORT = 8080;
server.listen(8080, () => {
    console.log(`🚀 Server inicado http://localhost:${PORT}`);
});
