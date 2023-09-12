'use strict';
//Criação da tabela de policiais civis no banco
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    await queryInterface.createTable('pcs', 
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

      delegacia: {
        type: Sequelize.STRING,
        allowNull: false,
        
      },

      cargo: {
        type: Sequelize.STRING,
        allowNull: true,
        
      },
      
    });
     
  },
//Exclusão da tabela user no banco
  async down (queryInterface, Sequelize) {
   
    await queryInterface.dropTable('pcs');
     
  }
};
