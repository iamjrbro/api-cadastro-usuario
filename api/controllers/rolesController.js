const rolesService = require('../services/usuarioService.js')
const RolesService = new rolesService();

class rolesController{
    static async cadastrar(req,res){
        const { nome, descricao } = req.body

        try{
            const roles = RolesService.cadastrar({ nome,descricao })

            res.status(201).send(roles)
        }catch(error){
            res.status(400).send({message:error.message})
        }
    }
    static async buscarTodasRoles(req,res){
        const roles = await RolesService.buscarTodasRoles()
        res.status(200).json(roles)
    }

    static async buscarRolesPorId(req, res){
        try{
            const{id} = req.params
        const roles = await RolesService.buscarRolesPorId(id)
        res.status(200).json(roles)
    } catch(error){
        console.log('Message error', error.message)
        res.status(400).send({message:error.message})
        }
    }

    static async deletarRolesPorId(req, res){
        try{
            const{id} = req.params
            const roles = await RolesService.deletarRolesPorId(id)
            res.status(200).send({message:'ROLE DELETADA COM SUCESSO!'})
        } catch(error){
            console.log('Message error', error.message)
            res.status(400).send({message:error.message})
        }
    }

    static async editarRole(req,res){
        try{
            const{id} = req.params
            const roles = await RolesService.editarRole(id)
            res.status(200).json(roles)
        } catch(error){
            console.log('Message error', error.message)
            res.status(400).send({message:error.message})
        }

    }
}

module.exports = rolesController;
