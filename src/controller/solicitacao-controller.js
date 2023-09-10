//Controller do Usuario
const {  SolicitacaoModel } = require ("../models/solicitacoes-model")

class SolicitacaoController {

  async create(req,res) {
      const { nomesolicitacao, data , descricao } = req.body
      const solicitacao = await SolicitacaoModel.create({ nomesolicitacao, data , descricao });
      return res.json(solicitacao)
  }
  
  async findAll(req,res) {
      const solicitacao = await SolicitacaoModel.findAll();
      return res.json(solicitacao)    
  }

  async update(req, res) {
        const { id } = req.params
        const { nomesolicitacao, data , descricao } = req.body
        SolicitacaoModel.update({ 
          nomesolicitacao, data , descricao}, 
            {
                where: {id}

            })
        return res.json('Solicitação atualizada com sucesso')
  }
    
  async delete(req, res) {
        const { id } = req.params
        const solicitacao = await SolicitacaoModel.destroy({
            where:{
                id
            }

        });
        return res.json('Solicitação deletada')
  }


}

module.exports = new SolicitacaoController();
