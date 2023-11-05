const dataBase = require('../models');
const {compare} = require('bcryptjs');
const {sign} = require('jsonwebtoken');
const jsonSecret = require('../config/jsonSecret.js');

class AuthService{
    async login(dto){
        const usuario = await dataBase.usuarios.findOne({
            attributes:['id', 'email', 'senha'],
            where:{
                email: dto.email
            }
        })

        if(!usuario){
            throw new Error('USUÁRIO NÃO CADASTRADO!')
        };

        const senhasIguais = compare(dto.senha, usuario.senha)

        if(!senhasIguais){
            throw new Error('USUÁRIO OU SENHA INVÁLIDO')
        };

        const acessToken = sign({
            id: usuario.id,
            email: usuario.email
        }, jsonSecret.secret,{
            expireIn: 86400
        })
        return {acessToken};
    }
}

module.exports = AuthService;
