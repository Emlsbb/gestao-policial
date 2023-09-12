const {Model, DataTypes} = require('sequelize')

class PcModel extends Model {
    static init (sequelize) {
        super.init({
            nome: DataTypes.STRING,
            senha: DataTypes.STRING,
            sexo: DataTypes.STRING,
            ingresso: DataTypes.DATE,
            data_nasc: DataTypes.DATE,
            endereco: DataTypes.STRING,
            email: DataTypes.STRING,
            delegacia: DataTypes.STRING,
            cargo: DataTypes.STRING,
        }, {
            modelName: 'pcs', //Nome que eu escolho para a tabela
            tableName: 'pcs', //nome da tabela no banco
            timestamps: false,
            sequelize
        })
    }

    static associate(models) {
        this.hasMany(models.procedimentos, { foreignKey: 'pc_id', as: 'pcs'})
    }
    
    static associate(models) {
        this.hasMany(models.tarefas, { foreignKey: 'pc_id', as: 'pcs'})
    }

    static associate(models) {
        this.hasMany(models.solicitacoes, { foreignKey: 'pc_id', as: 'pcs'})
    }
    
}

module.exports = { PcModel }
