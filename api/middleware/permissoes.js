const database = require('../models');

const permissoes = (listaPermissoes) =>{
    return async(req,res,next) =>{
        const {usuarioId} = req

        const usuario = await database.usuarios.findOne({
            include:[{
                model: database.permissoes,
                as: 'usuarios_permissoes',
                attributes: ['id', 'nome']
            }
            ],
            where:{
                id: usuarioId
            }
        })
        //se user nao tiver permissao
        if(!usuario){
            return res.status(401).send('USUARIO NAO CADASTRADO!')
        }
        //verificando a existencia das permissoes cadastradas
        const permissoesCadastradas = usuario.usuarios_permissoes
            .map((permissoes)=>permissoes.nome)
            .some((permissoes)=>listaPermissoes.includes(permissoes))
        //retornando caso os usuario nao possuam permissoes
        if(!permissoesCadastradas){
            return res.status(401).send('USUARIO NAO CADASTRADO!')
        }    
        //retornando next caso os usuarios nao possuam permissoes
        return next();
    }
}

module.exports = permissoes;