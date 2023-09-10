const {Model, DataTypes} = require('sequelize')

class ServidorModel extends Model {
    static init (sequelize) {
        super.init({
            nome: DataTypes.STRING,
            senha: DataTypes.STRING,
            sexo: DataTypes.STRING,
            ingresso: DataTypes.DATE,
            data_nasc: DataTypes.DATE,
            tipo_servidor: DataTypes.STRING,
            email: DataTypes.STRING,

        }, {
            modelName: 'ServidorModel', //Nome que eu escolho para a tabela
            tableName: 'servidores', //nome da tabela no banco
            timestamps: false,
            sequelize
        })
    }
}

module.exports = { ServidorModel }