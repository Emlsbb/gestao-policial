//Controller do policial civil

//Requisitando as ferramentas necessárias
const { HttpHelper } = require("../utils/http-helper");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PcModel } = require("../models/policialcivil-model")

class PcController {

    async create(req, res) {
        const httpHelper = new HttpHelper(res);
        try {
            const { nome, senha, sexo, ingresso, data_nasc, endereco, email, delegacia, cargo} = req.body
            if (
                !nome || !senha || !sexo || !ingresso || !data_nasc
                || !endereco || !email || !delegacia 
            )
                return httpHelper.badRequest(`
                Nome, senha, sexo, ingresso, data de nascimento, endereco, email e delegacia
                são campos obrigatórios
                `);

            const pcExist = await PcModel.findOne({ where: { email } });
            if (pcExist) return httpHelper.badRequest('E-mail já cadastrado!');

            const senhaHashed = await bcrypt.hash(
                senha,
                Number(process.env.SALT)
            );
            const pc = await PcModel.create({
                nome, senha: senhaHashed, sexo, ingresso, data_nasc,
                 endereco, email, delegacia, cargo
                
            });
            if (!pc) return httpHelper.badRequest('Houve um erro ao criar o policial civil');
            const accessToken = jwt.sign(
                { id: pc.id },
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
            const { nome, senha, sexo, ingresso, data_nasc, endereco, email, delegacia, cargo} = req.body
            if (
                !nome || !senha || !sexo || !ingresso || !data_nasc
                || !endereco || !email || !delegacia 
            )
                return httpHelper.badRequest(`
                Nome, senha, sexo, ingresso, data de nascimento, endereco, email e delegacia
                são campos obrigatórios
                `);

            const pcExist = await PcModel.findOne({ where: { email } });

            if (!pcExist) return httpHelper.notFound('policial civil não encontrado');
            const senhaValid = await bcrypt.compare(senha, pcExist.senha);
            if (!senhaValid) return httpHelper.badRequest('Senha incorreta');
            const accessToken = jwt.sign(
                { id: pcExist.id },
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

            const pc = await PcModel.findAll();

            if (!pc) {
                return httpHelper.notFound('não existem policias civis cadastrados')
            }

            return httpHelper.created({ pc, message: "policiais civis encontrados:" })

        } catch (error) {
            return httpHelper.badRequest('houve um erro ao exibir a lista de policiais civis')
        }

    }

    async update(req, res) {
        const httpHelper = new HttpHelper(res);
        try {
            const { id } = req.params
            const { nome, senha, sexo, ingresso, data_nasc, endereco, email, delegacia, cargo } = req.body

            const pc = await PcModel.findOne({ where: { id } })

            if (!pc) {
                return httpHelper.notFound("policial civil não encontrado")
            } else {
                const pc = await PcModel.update({
                    nome, senha, sexo, ingresso, data_nasc, endereco, email, delegacia, cargo
                }, { where: { id } })

                return httpHelper.ok({ pm, message: "policial civil alterado com sucesso" })
            }

        } catch (error) {

            return httpHelper.badRequest("Não foi possível atualizar o policial civil" )

        }

    }

    async delete(req, res) {
        const httpHelper = new HttpHelper(res);
        try {

            const { id } = req.params
            const pc = await PcModel.findOne({ where: { id } })
            if (!pc) {
                return httpHelper.notFound("policial civil não encontrado")   
            } else {
                await PcModel.destroy({ where: { id } })
                return httpHelper.ok("policial civil deletado com sucesso")
            }

        } catch (error) {
            return httpHelper.badRequest("Não foi possível deletar o policial civil")
        }

    }

}

module.exports = {PcController};
