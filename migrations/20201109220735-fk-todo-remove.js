'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.removeConstraint('Todos', 'Todo_user_index_fkey')
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.addConstraint('Todo',['user_index'], {
      type: Sequelize.DataTypes.UUID,
      references: {
        model: {
          tableName: 'User',
        },
        key: 'id'
      },
      allowNull: false
    })
  }
};
