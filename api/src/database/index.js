const { Sequelize } = require('sequelize');
const configDB = require('../config/config');
const database = new Sequelize(configDB);

//Requirindo os modelos
const { GestorModel } = require ('../models/gestores-model')
const { TarefaModel } = require ('../models/tarefas-model')
const { ProcedimentoModel } = require ('../models/procedimentos-model')
const { SolicitacaoModel } = require ('../models/solicitacoes-model')

//inicializando modelos
GestorModel.init(database)
TarefaModel .init(database)
ProcedimentoModel.init(database)
SolicitacaoModel.init(database)

module.exports = database
