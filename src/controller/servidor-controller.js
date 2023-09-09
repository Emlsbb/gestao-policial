//Controller do Usuario
const { ServidorModel } = require ("../models/servidor-model")

class ServidorController {


    async findAll(rec,res) {
        const objs = await ServidorModel.findAll();
        return res.json(objs)
        
      }


      async create(req,res) {
        const { nome, senha, sexo, ingresso, data_nasc, tipo_servidor } = req.body
        const servidor = await ServidorModel.create({  nome, senha, sexo, ingresso, data_nasc, tipo_servidor });
        return res.json(servidor)
      }
    
       async update(req, res) {
        const { id } = req.params
        const {  name,password } = req.body
        ServidorModel.update({ 
            name, password}, {
                where: {id}

            })
        return res.json('Usuario Atualizado com sucesso')
      }
    
     async delete(req, res) {
        const { id } = req.params
        const obj = await ServidorModel.destroy({
            where:{
                id
            }

        });
        return res.json('Usuario Deletado')
      }



}

module.exports = new ServidorController();