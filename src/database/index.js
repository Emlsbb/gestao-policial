const { Sequelize } = require('sequelize');
const configDB = require('../config/config');
const database = new Sequelize(configDB);



//Requirindo os modelos
const {MerendeiraModel} = require ('../models/merendeira-model');
const {EstoqueDiarioModel} = require ('../models/EstoqueDiario-model');
const {UserModel} = require ('../models/user-model');
const {ServidorModel} = require ('../models/servidor-model')

//inicializando eles
MerendeiraModel.init(database);
EstoqueDiarioModel.init(database);
UserModel.init(database);
ServidorModel.init(database)

// Inicie as relações aqui



module.exports = database