const seguranca = require('../routes/seguranca.js')
const segurancaService = require('../services/segurancaService.js')
const SegurancaService = new segurancaService();

class segurancaController{
    static async cadastrarAcl(req, res){
        //recebendo da requisicao o pwerfil de usuario e as permissoes. Serao dois arrays, com id das roles e com id das permissoes
        const{roles,permissoes} = req.body
        const {usuarioId} = req  //pegando o id do usuario direto da requisicao, utilizando as informacoes da autenticacao

        try{
            const acl = await SegurancaService.cadastrarAcl({roles,permissoes,usuarioId});
            res.status(201).send(acl) //passando acl cadastrada       
        }catch(error){
            res.status(400).send({message: error.message})
        }
    }

    static async cadastrarPermissoesRoles(req,res){
        const{roleId,permissoes} = req.body
        try{
            const permissoesRole = await segurancaService.cadastrarPermissoesRoles({roleId, permissoes})

            res.status(201).send(permissoesRole)
        }catch(error){
            res.status(400).send({message:error.message})
        }
    }
}

module.exports = segurancaController;
