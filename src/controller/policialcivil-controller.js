//Controller do Usuario
const { PcModel } = require("../models/policialcivil-model")

class PcController {

    async create(req, res) {
        try {

            const { nome, senha, sexo, ingresso, data_nasc, endereco, email, delegacia, cargo } = req.body
            //email único
            const pc = await PcModel.findOne({ where: { email } })

            if (pc) {
                return res.status(401).json({ message: "Este email já foi cadastrado" })

            } else {
                const pc = await PcModel.create({ nome, senha, sexo, ingresso, data_nasc, endereco, email, delegacia, cargo });
                return res.status(200).json(pc)
            }


        } catch (error) {
            return res.status(400).json({ message: "Não foi possível criar o policial civil" })
        }

    }

    async findAll(req, res) {
        try {

            const pc = await PcModel.findAll();

            if (!pc) {
                res.status(401).json({ message: "Não existem policiais civis cadastrados" })
            }

            return res.status(200).json({ pc, message: "policiais civis encontrados:" })

        } catch (error) {
            return res.status(400).json({ error, message: "policiais civis não encontrados" })
        }

    }

    async update(req, res) {

        try {
            const { id } = req.params
            const { nome, senha, sexo, ingresso, data_nasc, endereco, email, delegacia, cargo } = req.body

            const pc = await PcModel.findOne({ where: { id } })

            if (!pc) {
                return res.status(401).json({ message: "policial civil não encontrado" })
            } else {
                const pc = await PcModel.update({
                    nome, senha, sexo, ingresso, data_nasc, endereco, email, delegacia, cargo
                }, { where: { id } })

                return res.status(200).json({ pc, message: "policial civil alterado com sucesso" })
            }

            // PcModel.update({
            //     nome, senha, sexo, ingresso, data_nasc, endereco, email, organizacao
            // },
            //     {
            //         where: { id }

            //     })
            // return res.json('pc atualizado com sucesso')

        } catch (error) {

            return res.status(400).json({ error: "Não foi possível atualizar o policial civil" })

        }

    }

    async delete(req, res) {
        try {

            const { id } = req.params
            // const pc = await PcModel.destroy({
            //     where: {
            //         id
            //     }

            // });
            // return res.status(200).json('pc deletado')

            const pc = await PcModel.findOne({ where: { id } })
            if (!pc) {
                res.status(401).json({ message: "policial civil não encontrado" }
                )
            } else {
                await PcModel.destroy({ where: { id } })
                res.status(200).json({ message: "policial civil deletado com sucesso" })
            }

        } catch (error) {
            return res.status(400).json({ message: 'Não foi possível deletar o policial civil' })
        }

    }

}

module.exports = new PcController();
