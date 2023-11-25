'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usuario_permissoes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  usuario_permissoes.init({
    usuario_id: DataTypes.UUID,
    permissao_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'usuario_permissoes',
  });
  return usuario_permissoes;
};