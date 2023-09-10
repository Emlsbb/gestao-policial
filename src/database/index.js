//Configurando Sequelize
const { Sequelize } = require('sequelize');
const configDB = require('../config/config');
const database = new Sequelize(configDB);



//Requirindo os modelos
const { ServidorModel } = require('../models/servidor-model')
const { TarefaModel } = require ('../models/tarefas-model')
const { ProcedimentoModel } = require ('../models/procedimentos-model')
const { SolicitacaoModel } = require ('../models/solicitacoes-model')

//inicializando modelos para integração com banco
ServidorModel.init(database)
ServidorModel.init(database)
TarefaModel .init(database)
ProcedimentoModel.init(database)
SolicitacaoModel.init(database)


module.exports = database
