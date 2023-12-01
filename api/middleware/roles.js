//verifica o perfil do usuario, para garantir que tal pode acessar a rota solicitada

//recebe ums lista de roles, onde sera passado mais de um usuario que tera acesso ao endpoint
//parametro next passado para que a requisicao prossiga caso o usuario possua permissao

const database = require ('../models')
const role = require('../models/role')

const roles = (listaRoles) =>{
    return async(req,res,next) =>{
        //validando se o usuario tem permissao de acesso ao endpoint a partir do usuario id presente da requisicao
        const {usuarioId} = req

        const usuario = await database.usurios.findOne({
            include:[{
                model: database.roles,
                as: 'roles_usuarios',
                attributes: ['id', 'nome']
            }],
            where:{
                id: usuarioId
            }
        })
        if(!usuario){
            //erro 401 - nao autorizado
            res.status(401).send('USUÁRIO NAO CADASTRADO')
        }
        //verifica se a lista de roles que esta sendo passada possui o usuario que esta tentando logar e retorna todos os perfis que tal usuario possui
        //usando map para buscar pelo nome do usuario dentro da lista de roles
        const rolesCadastradas = usuario.roles_usuarios
            .map((role) => role.nome)
            .some((role) => listaRoles.includes(role)) //some verifica a existencia do perfil do usuario que esta tenatndo logar e retorna T(usuario possui permissao) ou F(usuario nao possui permissao)

        if(!rolesCadastradas){
            res.status(401).send('USUÁRIO NAO POSSUI PERMISSAO DE ACESSO A ESSA ROTA')
        }
        return next(); //retorna o fluxo para o usuario. Se o mesmo possuir permissao, o fluxo segue, caso contrario, recebera o erro
    }
}

module.exports = roles;
