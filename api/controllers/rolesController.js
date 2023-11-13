const rolesService = require('../services/usuarioService.js')
const RolesService = rolesService();

class rolesController{
    static async cadastrar(req,res){
        const { nome, descricao } = req.body

        try{
            const roles = rolesService.cadastrar({ nome,descricao })

            res.status(201).send(roles)
        }catch(error){
            res.status(400).send({message:error.message})
        }
    }
}

module.exports = rolesController;
