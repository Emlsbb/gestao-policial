const {Model, DataTypes} = require('sequelize')

class TarefaModel extends Model {
    static init (sequelize) {
        super.init({
            nometarefa: DataTypes.STRING,
            prazo: DataTypes.DATE,
            descricao: DataTypes.STRING,
            policial: DataTypes.STRING,
            gestor_id: DataTypes.INTEGER,
           

        }, {
            modelName: 'tarefas', //Nome que eu escolho para a tabela
            tableName: 'tarefas', //nome da tabela no banco
            timestamps: true,
            sequelize
        })
    }

    static associate(models){
        this.belongsTo(models.gestores, {foreignKey: 'gestor_id', as:'gestores'})
    }

}

module.exports = { TarefaModel }