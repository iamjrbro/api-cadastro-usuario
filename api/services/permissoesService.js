const { UUIDV4 } = require('sequelize');
const database = require('./modules')
const permissoesController = require('../controllers/permissoesController.js');

class permissoesService{
    async cadastrar(dto){
        const permissoes = await database.permissoes.findOne({where:{nome:dto.nome, descricao:dto.descricao}})

        if(permissoes){
            throw new Error ('PERMISSAO JÁ CADASTRADA!')
        }
        try{
            const newPermissao = await database.permissoes.create({
                id: UUIDV4.v4(),
                nome:dto.nome,
                descricao:dto.descricao
            })
            return newPermissao;
        }catch(error){
            throw new Error('ERRO AO CADASTRAR PERMISSAO!')
        }
    }
}

module.exports = permissoesService;
