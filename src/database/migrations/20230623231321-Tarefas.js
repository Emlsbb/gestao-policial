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

      nomeservidor: {
        type: Sequelize.STRING,
        allowNull: false,

      },

      nometarefa: {
        type: Sequelize.STRING(150),
        allowNull: false,

      },

      prazo: {
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
