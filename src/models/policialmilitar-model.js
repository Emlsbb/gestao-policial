const {Model, DataTypes} = require('sequelize')

class PmModel extends Model {
    static init (sequelize) {
        super.init({
            nome: DataTypes.STRING,
            senha: DataTypes.STRING,
            sexo: DataTypes.STRING,
            ingresso: DataTypes.DATE,
            data_nasc: DataTypes.DATE,
            endereco: DataTypes.STRING,
            email: DataTypes.STRING,
            crpm: DataTypes.STRING,
            batalhao: DataTypes.STRING,
            patente: DataTypes.STRING,
        }, {
            modelName: 'pms', //Nome que eu escolho para a tabela
            tableName: 'pms', //nome da tabela no banco
            timestamps: false,
            sequelize
        })
    }

    static associate(models) {
        this.hasMany(models.procedimentos, { foreignKey: 'pm_id', as: 'pms'})
    }
    
    static associate(models) {
        this.hasMany(models.tarefas, { foreignKey: 'pm_id', as: 'pms'})
    }

    static associate(models) {
        this.hasMany(models.solicitacoes, { foreignKey: 'pm_id', as: 'pms'})
    }
    
}

module.exports = { PmModel }
