//Controller do Usuario
const { ProcedimentoModel } = require("../models/procedimentos-model")

class ProcedimentoController {

  async create(req, res) {
    const { nomeprocedimento, data, descricao, pm_id, pc_id, } = req.body
    const procedimento = await ProcedimentoModel.create({ nomeprocedimento, data, descricao, pm_id, pc_id, });
    return res.json(procedimento)
  }

  async findAll(req, res) {
    const procedimento = await ProcedimentoModel.findAll();
    return res.json(procedimento)
  }

  async update(req, res) {
    const { id } = req.params
    const { nomeprocedimento, data, descricao, pm_id, pc_id, } = req.body
    ProcedimentoModel.update({
      nomeprocedimento, data, descricao, pm_id, pc_id,
    },
      {
        where: { id }

      })
    return res.status(200).json({message: 'Procedimento atualizado com sucesso'})
  }

  async delete(req, res) {
    const { id } = req.params
    const procedimento = await ProcedimentoModel.destroy({
      where: {
        id
      }

    });
    return res.json('Procedimento deletado')
  }

}

module.exports = new ProcedimentoController();
