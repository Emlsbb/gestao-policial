//Controller do Dashboard
const { ProcedimentoModel } = require("../models/procedimentos-model");
const { TarefaModel } = require("../models/tarefas-model");
const { SolicitacaoModel } = require("../models/solicitacoes-model");

class DashboardController {
  async index(req, res) {
    try {
      const proceduresCount = await ProcedimentoModel.count();
      const tasksCount = await TarefaModel.count();
      const requestsCount = await SolicitacaoModel.count();

      return res.status(200).json({
        proceduresCount,
        tasksCount,
        requestsCount,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}

module.exports = { DashboardController };
