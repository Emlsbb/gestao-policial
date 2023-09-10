const {Model, DataTypes} = require('sequelize')

class SolicitacaoModel extends Model {
    static init (sequelize) {
        super.init({
            nomesolicitacao: DataTypes.STRING,
            data: DataTypes.DATE,
            descricao: DataTypes.STRING,
            // nomeservidor: DataTypes.STRING

        }, {
            modelName: 'SolicitacoesModel', //Nome que eu escolho para a tabela
            tableName: 'solicitacoes', //nome da tabela no banco
            timestamps: true,
            sequelize
        })
    }
}

module.exports = { SolicitacaoModel }