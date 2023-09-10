const {Model, DataTypes} = require('sequelize')

class ProcedimentoModel extends Model {
    static init (sequelize) {
        super.init({
            nomeprocedimento: DataTypes.STRING,
            data: DataTypes.DATE,
            descricao: DataTypes.STRING,
            // nomeservidor: DataTypes.STRING

        }, {
            modelName: 'ProcedimentosModel', //Nome que eu escolho para a tabela
            tableName: 'procedimentos', //nome da tabela no banco
            timestamps: true,
            sequelize
        })
    }
}

module.exports = { ProcedimentoModel }