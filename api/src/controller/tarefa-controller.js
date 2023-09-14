//Controller das tarefas
const { TarefaModel } = require("../models/tarefas-model")

class TarefaController {

      async create(req, res) {
            const { nometarefa, prazo, pm_id, pc_id, gestor_id } = req.body
            const tarefa = await TarefaModel.create({ nometarefa, prazo, pm_id, pc_id, gestor_id });
            return res.json(tarefa)
      }

      async findAll(req, res) {
            const tarefa = await TarefaModel.findAll();
            return res.json(tarefa)

      }

      async update(req, res) {
            const { id } = req.params
            const { nometarefa, prazo, pm_id, pc_id, gestor_id } = req.body
            TarefaModel.update({
                  nometarefa, prazo, pm_id, pc_id, gestor_id
            },
                  {
                        where: { id }

                  })
            return res.json('Tarefa atualizada com sucesso')
      }

      async delete(req, res) {
            const { id } = req.params
            const tarefa = await TarefaModel.destroy({
                  where: {
                        id
                  }

            });
            return res.json('Tarefa deletada')
      }

}

module.exports = {TarefaController};
