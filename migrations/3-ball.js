'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Balls', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      brandId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references:{
            model:'Brands',
            key:'id'
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
      },
      naziv: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cena: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      velicina: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      sport: {
        type: Sequelize.STRING,
        allowNull: false
      },
      opis: {
        type: Sequelize.STRING,
        allowNull: false
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Balls');
  }
};