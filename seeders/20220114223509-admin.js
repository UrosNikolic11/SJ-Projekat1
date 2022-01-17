'use strict';
const bcrypt = require('bcrypt');
module.exports = {
  up: async (queryInterface, Sequelize) => {
  
      await queryInterface.bulkInsert('Users', [{
        ime: 'Admin',
        prezime: 'Adminic',
        username: 'admin',
        password: bcrypt.hashSync('admin', 10),
        email: 'admin@gmail.com',
        admin: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    
  },

  down: async (queryInterface, Sequelize) => {

     await queryInterface.bulkDelete('Users', null, {});
    
  }
};
