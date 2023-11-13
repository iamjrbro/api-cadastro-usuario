const { UUIDV4 } = require("sequelize")

class rolesService{
    async cadastrar(dto){
        const role = database.roles.findOne({
            where:{
                nome:dto.nome
            }
        })
        if(role){
            throw new Error('ROLE JÁ POSSUI CADASTRO')
        }
        try{
            const newRole = database.roles.create({
                id:UUIDV4,
                nome: dto.nome,
                descricao: dto.descricao
            })
            return newRole;
        } catch(error){
            throw new Error('ERRO AO CADASTRAR ROLE')
        }
    }
}

module.exports = rolesService;
