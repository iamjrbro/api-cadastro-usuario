const uuid = require('uuid');
const database = require('../models')
const permissoesController = require('../controllers/permissoesController.js');

class permissoesService{
    async cadastrar(dto){
        const permissoes = await database.permissoes.findOne({where:{nome:dto.nome}})

        if(permissoes){
            throw new Error ('PERMISSAO JÁ CADASTRADA!')
        }
        try{
            const newPermissao = await database.permissoes.create({
                id: uuid.v4(),
                nome:dto.nome,
                descricao:dto.descricao
            })
            return newPermissao;
        }catch(error){
            throw new Error('ERRO AO CADASTRAR PERMISSAO!')
        }
    }

    async buscarTodasPermissoes(){
        const permissoes = await database.permissoes.findAll()
        return permissoes;
    }

    async buscarPermissoesPorId(id){
        const permissoes = await database.permissoes.findOne({where:{id:id}})
        if (!permissao){
            throw new Error('PERMISSAO INFORMADA NAO CADASTRADA')
        }
        return permissoes;
    }

    async deletarPermissoesPorId(id){
        const permissao = await database.permissao.findOne({where:id})
        
        if(!permissao){
            throw new Error('PERMISSAO INFORMADA NAO CADASTRADA!')
        }
        try{
            await database.permissao.destroy({where:{id:id}})
        }catch(error){
                console.error('Message error:', error.message)
                throw error;
            
        }
    }

    async editarPermissoes(dto){
        const permissao = await database.permissao.findOne({where:{id:dto.id}})

        if (!permissao){
            throw new Error('PERMISSAO INFORMADA NAO CADASTRADA!')
        }
        try{
            permissao.nome = dto.nome,
            permissao.descricao = dto.descricao,
            await permissao.save()
            return await permissao.reload()
        }catch(error){
            console.error('Message error:', error.message)
            throw error;
        }
    }
}

module.exports = permissoesService;


