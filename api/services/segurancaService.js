const { cadastrarPermissoesRoles } = require('../controllers/segurancaController');
const database = require('../models');
const permissoes = require('../models/permissoes');
const role = require('../models/role');
const sequelize = require('sequelize');

class segurancaService{
    async cadastrarAcl(dto){
        const usuario = await database.usuarios.findOne({
            include:[{
                model: database.roles,
                as: 'roles_usuarios',
                attributes: ['id', 'nome', 'descricao'] //definindo os atributos desejados da tabela roles
            },
            {
                model: database.permissoes,
                as: 'roles_permissoes',
                attributes: ['id', 'nome', 'descricao'], 
            }],
            where:{
                id: dto.usuarioId
            }
        })
        if(!usuario){
            throw new Error ('USUÁRIO NAO CADASTRADO!')
        }
        //buscando as roles e permissoes no bd, verificando se os ids que estao sendo informados realmente existem
        //usando findAll para retornar todas as roles, já que mais de um id pode estar sendo adicionada ao usuário
        const rolesCadastradas = await database.roles.findAll({
            where:{
                //busca nao sera feita somente por um id, portanto, sera realizada uma validacao de busca para n perfis. Sendo assim, adiciona-se um objeto para busca dentro do banco de dados. Usando a funcao Op.in do Sequelize (where in), na qual se passa um array que tera todas suas posicoes verificadas - nesse caso o array passado foi o dto de roles
                id: {
                    [database.Sequelize.Op.in]: dto.roles
                }
            }
        })
        const permissoesCadastradas = await database.permissoes.findAll({
            where:{
                id: {
                    [database.Sequelize.Op.in]: dto.permissoes
                }
            }
        })
        //removendo as roles e permissoes já existentes do usuario  e inserindo as novas
        await usuario.removeUsuario_roles(usuario.usuario_roles),
        await usuario.removeUsuario_permissoes(usuario.usuario_permissoes);

        //adicionando as novas roles e permissoes ao inves daqueles informados na req
        await usuario.addUsuario_roles(rolesCadastradas),
        await usuario.addUsuario_permissoes(permissoesCadastradas);


        //buscando o usuario com as informacoes atualizadas
        const novoUsuario = await database.usuarios.findOne({
            include:[{
                model: database.roles,
                as: 'roles_usuarios',
                attributes: ['id', 'nome', 'descricao']
            },
            {
                model: database.permissoes,
                as: 'roles_permissoes',
                attributes: ['id', 'nome', 'descricao']
            }],
        })
        return novoUsuario;
    }

    //cadastrando as permissoes
    async cadastrarPermissoesRoles(dto){
        const role = await database.roles.findOne({
            include:[{
                model: database.permissoes,
                as: 'roles_usuarios',
                attributes:['id', 'nome', 'descricao']
            }]
        })
        if(!role){
            throw new Error ('ROLE NAO CADASTRADA') 
        }
        //buscando por todos os ids das permissoes e retornando todas as funcoes cadastradas
        const permissoesCadastradas = await database.permissoes.findAll({
            where:{
                id:{
                    [database.Sequelize.Op.in]: dto.permissoes
                }
            }
        })
        //removendo a role
        await usuario.removeRoles_Usuario(role.roles_usuarios)
        //adicionando o update da role
        await usuario.addRoles_usuarios(permissoesCadastradas)

        const novaRole = await database.role.findOne({
            include:[{
                model: database.permissoes,
                as: 'roles_usuarios',
                attributes: ['id', 'nome', 'descricao']
            }],
            where:{
                id: dto.roleId
            }
        })
        return novaRole;
    }

};



module.exports = segurancaService;

/* o where nao retorna as informacoes dos perfis e permissoes de usuario, portanto, sera utilizado o atributo includes, que rece um array e contem todos os imports/relacionamentos feitos na tabela de usuarios.
dentro do mesmo, passa-se um objeto e retorna-se as informacoes das roles*/
