'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('usuario_permissoes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      //references faz referencia ao id da tabela de usuarios
      usuario_id: {
        type: Sequelize.UUID,
        references:{
          model: 'usuarios',
          key: 'id'},
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      //references faz referencia ao id da tabela de permissao
      permissao_id: {
        type: Sequelize.UUID,
        references:{
          model: 'permissao',
          key: 'id'},
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('usuario_permissoes');
  }
};