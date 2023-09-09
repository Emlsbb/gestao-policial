'use strict';
//Criação da tabela servidor no Banco
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    await queryInterface.createTable('servidores', 
    { 
      
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
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

      tipo_servidor: {
        type: Sequelize.STRING,
        allowNull: false,
        
      },
      
    
    
    
    
    });
     
  },
//Exclusão da tabela user no banco
  async down (queryInterface, Sequelize) {
   
    await queryInterface.dropTable('servidores');
     
  }
};
