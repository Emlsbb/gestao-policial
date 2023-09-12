//Controller do Usuario
const { GestorModel } = require("../models/gestores-model")

class GestorController {

    async create(req, res) {
        try {

            const { nome, senha, sexo, data_nasc, endereco, email, organizacao } = req.body
            //email único
            const gestor = await GestorModel.findOne({ where: { email } })

            if (gestor) {
                return res.status(401).json({ message: "Este email já foi cadastrado" })

            } else {
                const gestor = await GestorModel.create({ nome, senha, sexo, data_nasc, endereco, email, organizacao });
                return res.status(200).json(gestor)
            }


        } catch (error) {
            return res.status(400).json({ message: "Não foi possível criar o gestor" })
        }

    }

    async findAll(req, res) {
        try {

            const gestor = await GestorModel.findAll();

            if (!gestor) {
                res.status(401).json({ message: "Não existem gestores cadastrados" })
            }

            return res.status(200).json({ gestor, message: "gestores encontrados:" })

        } catch (error) {
            return res.status(400).json({ error, message: "gestores não encontrados" })
        }

    }

    async update(req, res) {

        try {
            const { id } = req.params
            const { nome, senha, sexo, data_nasc, endereco, email, organizacao } = req.body

            const gestor = await GestorModel.findOne({ where: { id } })

            if (!gestor) {
                return res.status(401).json({ message: "gestor não encontrado" })
            } else {
                const gestor = await GestorModel.update({
                    nome, senha, sexo, data_nasc, endereco, email, organizacao
                }, { where: { id } })

                return res.status(200).json({ gestor, message: "gestor alterado com sucesso" })
            }

            // GestorModel.update({
            //     nome, senha, sexo, ingresso, data_nasc, endereco, email, organizacao
            // },
            //     {
            //         where: { id }

            //     })
            // return res.json('gestor atualizado com sucesso')

        } catch (error) {

            return res.status(400).json({ error: "Não foi possível atualizar o gestor" })

        }

    }

    async delete(req, res) {
        try {

            const { id } = req.params
            // const gestor = await GestorModel.destroy({
            //     where: {
            //         id
            //     }

            // });
            // return res.status(200).json('gestor deletado')

            const gestor = await GestorModel.findOne({ where: { id } })
            if (!gestor) {
                res.status(401).json({ message: "gestor não encontrado" }
                )
            } else {
                await GestorModel.destroy({ where: { id } })
                res.status(200).json({ message: "gestor deletado com sucesso" })
            }

        } catch (error) {
            return res.status(400).json({ message: 'Não foi possível deletar o gestor' })
        }

    }

}

module.exports = new GestorController();
