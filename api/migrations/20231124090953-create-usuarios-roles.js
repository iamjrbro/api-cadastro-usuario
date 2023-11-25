'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('usuarios_roles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      //references faz referencia ao id da tabela de usuarios, visto que o usuario id faz referencia ao id do usuario 
      usuario_id: {
        type: Sequelize.UUID, 
        references: { 
          model: 'usuarios',
          key: 'id'},
          onDelete: 'CASCADE', //caso o usuario seja deletado
          onUpdate: 'CASCADE'
      },

      //references faz referencia ao id da tabela de roles
      role_id: {
        type: Sequelize.UUID,
        references:{ 
          model:'roles',
          key:'id'},
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
    await queryInterface.dropTable('usuarios_roles');
  }
};