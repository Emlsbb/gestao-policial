'use strict';
//Criação da tabela tarefas no banco
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    await queryInterface.createTable('procedimentos', 
    { 
      
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      nomeservidor: {
        type: Sequelize.STRING,
        allowNull: false,

      },

      nomeprocedimento: {
        type: Sequelize.STRING,
        allowNull: false,

      },

      data: {
        type: Sequelize.DATE,
        allowNull: false,

      },

      descricao: {
        type: Sequelize.STRING,
        allowNull: true,


      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,

      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,

      }
      

    });
     
  },
//Exclusão da tabela procedimentos no banco
  async down (queryInterface, Sequelize) {
   
    await queryInterface.dropTable('procedimentos');
     
  }
};
