'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Shoes', {
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
      broj: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      tip: {
        type: Sequelize.STRING,
        allowNull: false
      },
      opis: {
        type: Sequelize.STRING,
        allowNull: true
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
    await queryInterface.dropTable('Shoes');
  }
};