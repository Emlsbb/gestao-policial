'use strict';
//Criação da tabela tarefas no banco
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    await queryInterface.createTable('tarefas', 
    { 
      
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },

      policial: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      gestor_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "gestores",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },

      nometarefa: {
        type: Sequelize.STRING(150),
        allowNull: false,

      },

      prazo: {
        type: Sequelize.DATE,
        allowNull: false,

      },

      descricao: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,

      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,

      },
    
    
    });
     
  },
//Exclusão da tabela tarefas no banco
  async down (queryInterface, Sequelize) {
   
    await queryInterface.dropTable('tarefas');
     
  }
};
