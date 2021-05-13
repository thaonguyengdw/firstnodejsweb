'use strict';
var Promise = require('bluebird');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return Promise.all([queryInterface.addColumn('Users','email', {type: Sequelize.STRING}),
    queryInterface.addColumn('Users','phone_number',{type: Sequelize.INTEGER})
  ]); 
    
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     return Promise.all([queryInterface.removeColumn('Users','email', null),
     queryInterface.removeColumn('Users','phone_number', null)
   ]); 
  }
};
