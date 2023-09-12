const {Model, DataTypes} = require('sequelize')

class SolicitacaoModel extends Model {
    static init (sequelize) {
        super.init({
            nomesolicitacao: DataTypes.STRING,
            data: DataTypes.DATE,
            descricao: DataTypes.STRING,
            pm_id: DataTypes.INTEGER,
            pc_id: DataTypes.INTEGER,

        }, {
            modelName: 'solicitacoes', //Nome que eu escolho para a tabela
            tableName: 'solicitacoes', //nome da tabela no banco
            timestamps: true,
            sequelize
        })
    }

    static associate(models){
        this.belongsTo(models.pms, {foreignKey: 'pm_id', as:'pms'})
    }

    static associate(models){
        this.belongsTo(models.pcs, {foreignKey: 'pc_id', as:'pcs'})
    }

}

module.exports = { SolicitacaoModel }