const { Sequelize } = require('sequelize');
const configDB = require('../config/config');
const database = new Sequelize(configDB);

//Requirindo os modelos
const { PmModel } = require ('../models/policialmilitar-model')
const { PcModel } = require ('../models/policialcivil-model')
const { GestorModel } = require ('../models/gestores-model')
const { ProcedimentoModel } = require ('../models/procedimentos-model')
const { TarefaModel } = require ('../models/tarefas-model')
const { SolicitacaoModel } = require ('../models/solicitacoes-model')

//inicializando modelos
PmModel.init(database)
PcModel.init(database)
GestorModel.init(database)
ProcedimentoModel.init(database)
TarefaModel.init(database)
SolicitacaoModel.init(database)

module.exports = database
