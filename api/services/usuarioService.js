const { v4: uuidv4 } = require('uuid');
const database = require('../models');
const { where } = require('sequelize');

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
    };
};

module.exports = usuarioService;
