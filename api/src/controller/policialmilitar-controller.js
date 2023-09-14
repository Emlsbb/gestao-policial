//Controller do policial militar

//Requisitando as ferramentas necessárias
const { HttpHelper } = require("../utils/http-helper");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PmModel } = require("../models/policialmilitar-model")

class PmController {

    async create(req, res) {
        const httpHelper = new HttpHelper(res);
        try {
            const { nome, senha, sexo, ingresso, data_nasc, endereco, email, crpm, batalhao, patente } = req.body
            if (
                !nome || !senha || !sexo || !ingresso || !data_nasc
                || !endereco || !email || !crpm || !batalhao || !patente
            )
                return httpHelper.badRequest(`
                Nome, senha, sexo, ingresso, data de nascimento, endereco, email, crpm,
                batalhao e patente são campos obrigatórios
                `);

            const pmExist = await PmModel.findOne({ where: { email } });
            if (pmExist) return httpHelper.badRequest('E-mail já cadastrado!');

            const senhaHashed = await bcrypt.hash(
                senha,
                Number(process.env.SALT)
            );
            const pm = await PmModel.create({
                nome, senha: senhaHashed, sexo, ingresso, data_nasc,
                 endereco, email, crpm, batalhao, patente
                
            });
            if (!pm) return httpHelper.badRequest('Houve um erro ao criar o policial militar');
            const accessToken = jwt.sign(
                { id: pm.id },
                process.env.TOKEN_SECRET,
                { expiresIn: process.env.TOKEN_EXPIRES_IN }
            );
            return httpHelper.created({message:"Token do policial:",accessToken });
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async login(req, res) {
        const httpHelper = new HttpHelper(res);
        try {
            const { nome, senha, sexo, ingresso, data_nasc, endereco, email, crpm, batalhao, patente } = req.body
            if (
                !nome || !senha || !sexo || !ingresso || !data_nasc
                || !endereco || !email || !crpm || !batalhao || !patente
            )
                return httpHelper.badRequest(`
                Nome, senha, sexo, ingresso, data de nascimento, endereco, email, crpm,
                batalhao e patente são campos obrigatórios
                `);
            const pmExist = await PmModel.findOne({ where: { email } });
            if (!pmExist) return httpHelper.notFound('Policial militar não encontrado');
            const senhaValid = await bcrypt.compare(senha, pmExist.senha);
            if (!senhaValid) return httpHelper.badRequest('Senha incorreta');
            const accessToken = jwt.sign(
                { id: pmExist.id },
                process.env.TOKEN_SECRET,
                { expiresIn: process.env.TOKEN_EXPIRES_IN }
            );
            return httpHelper.ok({ accessToken });
        
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async findAll(req, res) {
        const httpHelper = new HttpHelper(res);
        try {

            const pm = await PmModel.findAll();

            if (!pm) {
                return httpHelper.notFound('não existem policias militares cadastrados')
            }

            return httpHelper.created({ pm, message: "policiais militares encontrados:" })

        } catch (error) {
            return httpHelper.badRequest('houve um erro ao exibir a lista de policiais militares')
        }

    }

    async update(req, res) {
        const httpHelper = new HttpHelper(res);
        try {
            const { id } = req.params
            const { nome, senha, sexo, ingresso, data_nasc, endereco, email, crpm, batalhao, patente } = req.body

            const pm = await PmModel.findOne({ where: { id } })

            if (!pm) {
                return httpHelper.notFound("policial militar não encontrado")
            } else {
                const pm = await PmModel.update({
                    nome, senha, sexo, ingresso, data_nasc, endereco, email, crpm, batalhao, patente
                }, { where: { id } })

                return httpHelper.ok({ pm, message: "policial militar alterado com sucesso" })
            }

        } catch (error) {

            return httpHelper.badRequest("Não foi possível atualizar o policial militar" )

        }

    }

    async delete(req, res) {
        const httpHelper = new HttpHelper(res);
        try {

            const { id } = req.params
            const pm = await PmModel.findOne({ where: { id } })
            if (!pm) {
                return httpHelper.notFound("policial militar não encontrado")
            } else {
                await PmModel.destroy({ where: { id } })
                return httpHelper.ok("policial militar deletado com sucesso")
            }

        } catch (error) {
            return httpHelper.badRequest("Não foi possível deletar o policial militar")
        }

    }

}

module.exports = {PmController};
