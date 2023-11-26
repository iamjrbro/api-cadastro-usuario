'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usuarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      usuarios.belongsToManys(models.roles, { 
        //dentro do objeto serao passadas as informacoes da tabela pivot
        through: models.usuarios_roles,  //recebe a pivot que sera utilizada
        as: 'usuario_roles', //alias/apelido do relacionamento da tabela
        foreignKey: 'usuario_id' //chave estrangeira da tabela, recebendo a coluna cadastrada dentro da tabela alias
      })
      usuarios.belongsToMany(models.permissoes,{
        through: models.usuarios_permissoes,
        as: 'usuarios_permissoes',
        foreignKey: 'usuario_id'
      })
    }
  }
  usuarios.init({
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    senha: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'usuarios',
    defaultScope:{
      attributes:{
        exclude:['senha']
      }
    }
  });
  return usuarios;
};
