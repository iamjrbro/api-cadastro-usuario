const permissoesService = require('../services/permissoesService.js')
const PermissoesService = new permissoesService()

class permissoesController{
    static async cadastrar(req, res){
        const {nome, descricao} = req.body
        try{
            const permissoes = PermissoesService.cadastrar({nome, descricao})
            res.status(201).send(permissoes)
        } catch(error){
            res.status(400).send({message:error.message})
        }
    }

    static async buscarTodasPermissoes(res,res){
        const permissoes = await PermissoesService.buscarTodasPermissoes()
        res.status(200).json(permissoes)
    }

    static async buscarPermissoesPorId(res,res){
        try{
            const{id} = req.params
            const permissoes = await PermissoesService.buscarPermissoesPorId(id)
            res.status(200).json(permissoes)
        } catch(error){
            console.log('Message error', error.message)
            res.status(400).send({message:error.message})
        }
    }

    static async deletarPermissoesPorId(req,res){
        try{
            const{id} = req.params
            const permissoes = await PermissoesService.deletarPermissoesPorId(id)
            res.status(200).send({message:'PERMISSAO DELETADA COM SUCESSO!'})
        } catch(error){
            console.log('Message error', error.message)
        }
    }

    static async editarPermissoes(req,res){
        try{
            const{id} = req.params
            const permissoes = await PermissoesService.editarPermissoes(id)
            res.status(200).json(permissoes)
        }catch(error){
            console.log('Message error', error.message)
            res.status(400).send({message:error.message})
        }
    }
}

module.exports = permissoesController;
