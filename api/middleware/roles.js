//verifica o perfil do usuario, para garantir que tal pode acessar a rota solicitada

//recebe ums lista de roles, onde sera passado mais de um usuario que tera acesso ao endpoint
//parametro next passado para que a requisicao prossiga caso o usuario possua permissao
const roles = (listaRoles) =>{
    return async(req,res,next) =>{
        //validando se o usuario tem permissao de acesso ao endpoint a partir do usuario id
    }
}