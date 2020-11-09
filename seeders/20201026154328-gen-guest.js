'use strict';
const uuid = require('uuid')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('User',[{
      id: uuid(),
      username: 'MyAppGuest',
      password: 'akwejr;lakwj3?0923je:KLDFSLjka.w3,m2q.,34;lkjzfsdl12kjfoqiwjJDASLoeqwihklz9375'
    }])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    queryInterface.bulkDelete('User', null, {})
  }
};
