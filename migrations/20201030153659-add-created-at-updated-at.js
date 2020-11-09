'use strict';

module.exports = {
  up: async (queryInterface, {DataTypes, ...Sequelize}) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Users', 'createdAt', DataTypes.DATE)
      .then(() => queryInterface.addColumn('Users','updatedAt', DataTypes.DATE))
    return queryInterface.renameColumn('Todos', 'date_added', 'createdAt')
      .then(() => queryInterface.addColumn('Todos', 'updatedAt', DataTypes.DATE))
  },

  down: async (queryInterface, {DataTypes, ...Sequelize}) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Users', 'createdAt')
      .then(() => queryInterface.removeColumn('Users','updatedAt'))
    return queryInterface.renameColumn('Todos', 'createdAt', 'date_added')
      .then(() => queryInterface.removeColumn('Todos', 'updatedAt'))
  }
};
