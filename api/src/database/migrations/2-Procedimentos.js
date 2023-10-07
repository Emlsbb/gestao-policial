'use strict';
//Criação da tabela tarefas no banco
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('procedimentos',
      {

        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },

        policial: {
          type: Sequelize.STRING,
          allowNull: false,
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
       

        nomeprocedimento: {
          type: Sequelize.STRING,
          allowNull: false,

        },

        data: {
          type: Sequelize.DATEONLY,
          allowNull: false,

        },

        descricao: {
          type: Sequelize.STRING,
          allowNull: false,


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
  //Exclusão da tabela procedimentos no banco
  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable('procedimentos');

  }
};
