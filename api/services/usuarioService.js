const { v4: uuidv4 } = require('uuid');
const database = require('../models');
const { where } = require('sequelize');
const { hash } = require('bcryptjs');
const uuid = require('uuid');

class usuarioService{
    async cadastrar(dto){
        const usuario = await database.usuario.findOne({
            where:{
                email: dto.email
            }
        })
        if(usuario){
            throw new Error('Usuário já possui cadastro!')
        };

        try{
            const senhaHash = await hash(dto.senha, 8)
            const novoUsuario = await database.usuarios.create({
                id: uuid.v4(),
                nome: dto.nome,
                email: dto.email,
                senha: senhaHash
            })
            return novoUsuario;
        } catch(error){
            throw new Error('ERRO AO CADASTRAR USUÁRIO')
        }
    };
};

module.exports = usuarioService;

