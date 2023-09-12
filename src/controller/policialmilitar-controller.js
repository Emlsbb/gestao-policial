//Controller do Usuario
const { PmModel } = require("../models/policialmilitar-model")

class PmController {

    async create(req, res) {
        try {

            const { nome, senha, sexo, ingresso, data_nasc, endereco, email, crpm, batalhao, patente } = req.body
            //email único
            const pm = await PmModel.findOne({ where: { email } })

            if (pm) {
                return res.status(401).json({ message: "Este email já foi cadastrado" })

            } else {
                const pm = await PmModel.create({ nome, senha, sexo, ingresso, data_nasc, endereco, email, crpm, batalhao, patente });
                return res.status(200).json(pm)
            }


        } catch (error) {
            return res.status(400).json({ message: "Não foi possível criar o policial militar" })
        }

    }

    async findAll(req, res) {
        try {

            const pm = await PmModel.findAll();

            if (!pm) {
                res.status(401).json({ message: "Não existem policiais militares cadastrados" })
            }

            return res.status(200).json({ pm, message: "policiais militares encontrados:" })

        } catch (error) {
            return res.status(400).json({ error, message: "policiais militares não encontrados" })
        }

    }

    async update(req, res) {

        try {
            const { id } = req.params
            const { nome, senha, sexo, ingresso, data_nasc, endereco, email, crpm, batalhao, patente } = req.body

            const pm = await PmModel.findOne({ where: { id } })

            if (!pm) {
                return res.status(401).json({ message: "policial militar não encontrado" })
            } else {
                const pm = await PmModel.update({
                    nome, senha, sexo, ingresso, data_nasc, endereco, email, crpm, batalhao, patente
                }, { where: { id } })

                return res.status(200).json({ pm, message: "policial militar alterado com sucesso" })
            }

            // PmModel.update({
            //     nome, senha, sexo, ingresso, data_nasc, endereco, email, organizacao
            // },
            //     {
            //         where: { id }

            //     })
            // return res.json('pm atualizado com sucesso')

        } catch (error) {

            return res.status(400).json({ error: "Não foi possível atualizar o policial militar" })

        }

    }

    async delete(req, res) {
        try {

            const { id } = req.params
            // const pm = await PmModel.destroy({
            //     where: {
            //         id
            //     }

            // });
            // return res.status(200).json('pm deletado')

            const pm = await PmModel.findOne({ where: { id } })
            if (!pm) {
                res.status(401).json({ message: "policial militar não encontrado" }
                )
            } else {
                await PmModel.destroy({ where: { id } })
                res.status(200).json({ message: "policial militar deletado com sucesso" })
            }

        } catch (error) {
            return res.status(400).json({ message: 'Não foi possível deletar o policial militar' })
        }

    }

}

module.exports = new PmController();
