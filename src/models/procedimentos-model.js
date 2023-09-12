const {Model, DataTypes} = require('sequelize')

class ProcedimentoModel extends Model {
    static init (sequelize) {
        super.init({
            nomeprocedimento: DataTypes.STRING,
            data: DataTypes.DATE,
            descricao: DataTypes.STRING,
            pm_id: DataTypes.INTEGER,
            pc_id: DataTypes.INTEGER,
            gestor_id: DataTypes.INTEGER,

        }, {
            modelName: 'procedimentos', //Nome que eu escolho para a tabela
            tableName: 'procedimentos', //nome da tabela no banco
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

    static associate(models){
        this.belongsTo(models.gestores, {foreignKey: 'gestor_id', as:'gestores'})
    }

}

module.exports = { ProcedimentoModel }
