const {Model, DataTypes} = require('sequelize')

class TarefaModel extends Model {
    static init (sequelize) {
        super.init({
            nometarefa: DataTypes.STRING,
            prazo: DataTypes.DATE,
            // nomeservidor: DataTypes.STRING

        }, {
            modelName: 'TarefaModel', //Nome que eu escolho para a tabela
            tableName: 'tarefas', //nome da tabela no banco
            timestamps: true,
            sequelize
        })
    }
}

module.exports = { TarefaModel }