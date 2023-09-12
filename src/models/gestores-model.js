const {Model, DataTypes} = require('sequelize')

class GestorModel extends Model {
    static init (sequelize) {
        super.init({
            nome: DataTypes.STRING,
            senha: DataTypes.STRING,
            sexo: DataTypes.STRING,
            data_nasc: DataTypes.DATE,
            endereco: DataTypes.STRING,
            email: DataTypes.STRING,
            organizacao: DataTypes.STRING,

        }, {
            modelName: 'gestores', //Nome que eu escolho para a tabela
            tableName: 'gestores', //nome da tabela no banco
            timestamps: false,
            sequelize
        })
    }

    static associate(models) {
        this.hasMany(models.procedimentos, { foreignKey: 'gestor_id', as: 'gestores'})
    }

}

module.exports = { GestorModel }