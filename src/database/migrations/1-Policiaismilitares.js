'use strict';
//Criação da tabela dos policiais militares no banco
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    await queryInterface.createTable('pms', 
    { 
      
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        
      },

      nome: {
        type: Sequelize.STRING,
        allowNull: false,

      },

      senha: {
        type: Sequelize.STRING,
        allowNull: false,

      },

      sexo: {
        type: Sequelize.STRING,
        allowNull: false,
        
      },

      ingresso: {
        type: Sequelize.DATE,
        allowNull: false,
        
      },

      data_nasc: {
        type: Sequelize.DATE,
        allowNull: false,
        

      },

      endereco: {
        type: Sequelize.STRING,
        allowNull: false,
        
      },

      email: {
        type: Sequelize.STRING,
        allowNull: false,
        
      },

      crpm: {
        type: Sequelize.STRING,
        allowNull: false,
        
      },

      batalhao: {
        type: Sequelize.STRING,
        allowNull: false,
        
      },

      patente: {
        type: Sequelize.STRING,
        allowNull: false,
        
      },
      
    });
     
  },
//Exclusão da tabela user no banco
  async down (queryInterface, Sequelize) {
   
    await queryInterface.dropTable('pms');
     
  }
};
