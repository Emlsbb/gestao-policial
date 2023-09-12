'use strict';
//Criação da tabela de gestores no Banco
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    await queryInterface.createTable('gestores', 
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

      organizacao: {
        type: Sequelize.STRING,
        allowNull: false,
        
      },
      
    });
     
  },
//Exclusão da tabela user no banco
  async down (queryInterface, Sequelize) {
   
    await queryInterface.dropTable('gestores');
     
  }
};
