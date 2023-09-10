//Controller do Usuario
const { TarefaModel } = require ("../models/tarefas-model")

class TarefaController {
  
  async create(req,res) {
        const { nometarefa, prazo } = req.body
        const tarefa = await TarefaModel.create({  nometarefa, prazo });
        return res.json(tarefa)
  }

  async findAll(req,res) {
        const tarefa = await TarefaModel.findAll();
        return res.json(tarefa)
        
  }

  async update(req, res) {
        const { id } = req.params
        const { nometarefa, prazo } = req.body
        TarefaModel.update({ 
          nometarefa, prazo}, 
            {
                where: {id}

            })
        return res.json('Tarefa atualizada com sucesso')
  }
    
  async delete(req, res) {
        const { id } = req.params
        const tarefa = await TarefaModel.destroy({
            where:{
                id
            }

        });
        return res.json('Tarefa deletada')
  }

}

module.exports = new TarefaController();
