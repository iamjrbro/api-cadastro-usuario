'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      roles.belongsToMany(models.usuarios,{
        through: models.usuarios_roles,
        as: 'roles_usuarios',
        foreignKey: 'role_id'
      })
      roles.belongsToMany(models.permissoes,{
        through: models.roles_permissoes,
        as: 'role_permissoes',
        foreignKey: 'role_id'
      })
    }
  }
  Role.init({
    nome: DataTypes.STRING,
    descricao: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};
