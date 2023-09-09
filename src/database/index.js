const { Sequelize } = require('sequelize');
const configDB = require('../config/config');
const database = new Sequelize(configDB);



//Requirindo os modelos
const {ServidorModel} = require ('../models/servidor-model')

//inicializando modelos para integração com banco
ServidorModel.init(database)


module.exports = database
