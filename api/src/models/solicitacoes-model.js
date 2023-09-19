const {Model, DataTypes} = require('sequelize')

class SolicitacaoModel extends Model {
    static init (sequelize) {
        super.init({
            nomesolicitacao: DataTypes.STRING,
            data: DataTypes.DATE,
            descricao: DataTypes.STRING,
            policial: DataTypes.STRING,
            gestor_id: DataTypes.INTEGER,

        }, {
            modelName: 'solicitacoes', //Nome que eu escolho para a tabela
            tableName: 'solicitacoes', //nome da tabela no banco
            timestamps: true,
            sequelize
        })
    }

    static associate(models){
        this.belongsTo(models.gestores, {foreignKey: 'gestor_id', as:'gestores'})
    }

}

module.exports = { SolicitacaoModel }