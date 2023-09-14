//Controller do gestor

//Requisitando as ferramentas necessárias
const { HttpHelper } = require("../utils/http-helper");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { GestorModel } = require("../models/gestores-model")

class GestorController {

    async create(req, res) {
        const httpHelper = new HttpHelper(res);
        try {
            const { nome, senha, sexo, data_nasc, endereco, email, organizacao } = req.body
            if (
                !nome || !senha || !sexo || !data_nasc
                || !endereco || !email || !organizacao
            )
                return httpHelper.badRequest(`
                Nome, senha, sexo, data de nascimento, endereco, email, 
                e organização são campos obrigatórios
                `);

            const gestorExist = await GestorModel.findOne({ where: { email } });
            if (gestorExist) return httpHelper.badRequest('E-mail já cadastrado!');

            const senhaHashed = await bcrypt.hash(
                senha,
                Number(process.env.SALT)
            );
            const gestor = await GestorModel.create({
                nome, senha: senhaHashed, sexo, data_nasc,
                 endereco, email, organizacao
                
            });
            if (!gestor) return httpHelper.badRequest('Houve um erro ao criar o gestor');
            const accessToken = jwt.sign(
                { id: gestor.id },
                process.env.TOKEN_SECRET,
                { expiresIn: process.env.TOKEN_EXPIRES_IN }
            );
            return httpHelper.created({message:"Token do gestor:",accessToken });

        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async login(req, res) {
        const httpHelper = new HttpHelper(res);
        try {
            const { nome, senha, sexo, data_nasc, endereco, email, organizacao } = req.body
            if (
                !nome || !senha || !sexo || !data_nasc
                || !endereco || !email || !organizacao
            )
                return httpHelper.badRequest(`
                Nome, senha, sexo, data de nascimento, endereco, email, 
                e organização são campos obrigatórios
                `);
            const gestorExist = await GestorModel.findOne({ where: { email } });

            if (!gestorExist) return httpHelper.notFound('gestor não encontrado');
            const senhaValid = await bcrypt.compare(senha, gestorExist.senha);
            if (!senhaValid) return httpHelper.badRequest('Senha incorreta');
            const accessToken = jwt.sign(
                { id: gestorExist.id },
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

            const gestor = await GestorModel.findAll();

            if (!gestor) {
                return httpHelper.notFound('não existem gestores cadastrados')
            }

            return httpHelper.created({ gestor, message: "gestores encontrados:" })

        } catch (error) {
            return httpHelper.badRequest('houve um erro ao exibir a lista de gestores')
        }

    }

    async update(req, res) {
        const httpHelper = new HttpHelper(res);
        try {
            const { id } = req.params
            const { nome, senha, sexo, data_nasc, endereco, email, organizacao } = req.body

            const gestor = await GestorModel.findOne({ where: { id } })

            if (!gestor) {
                return httpHelper.notFound("gestor não encontrado")
            } else {
                const gestor = await GestorModel.update({
                    nome, senha, sexo, data_nasc, endereco, email, organizacao
                }, { where: { id } })

                return httpHelper.ok({ gestor, message: "gestor alterado com sucesso" })
            }

        } catch (error) {

            return httpHelper.badRequest("Não foi possível atualizar o gestor" )

        }

    }

    async delete(req, res) {
        const httpHelper = new HttpHelper(res);
        try {

            const { id } = req.params
            const gestor = await GestorModel.findOne({ where: { id } })
            if (!gestor) {
                return httpHelper.notFound("gestor não encontrado")   
            } else {
                await GestorModel.destroy({ where: { id } })
                return httpHelper.ok("gestor deletado com sucesso")
            }

        } catch (error) {
            return httpHelper.badRequest("Não foi possível deletar o gestor")
        }

    }

}

module.exports = {GestorController}
