const usuarioService = require('../services/usuarioService.js');
const usuarioservice = new usuarioService()

class usuarioController{
   static async cadastrar(req,res){
        const {nome, email, senha} = req.body
        try{
            const usuario = await usuarioservice.cadastrar({nome, email, senha})
        } catch(error){
            res.status(400).send({message: error.message})
        }
        res.status(201).send(usuario)
    }
}

module.exports = usuarioController;
