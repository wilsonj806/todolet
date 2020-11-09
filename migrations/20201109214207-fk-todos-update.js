'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.changeColumn('Todos', 'user_index', {
      type: Sequelize.DataTypes.UUID,
      references: {
        model: {
          tableName: 'Users',
        },
        key: 'id'
      },
      allowNull: false,
      onDelete: 'CASCADE'
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.changeColumn('Todos', 'user_index',{
      type: Sequelize.DataTypes.UUID,
      references: {
        model: {
          tableName: 'Users',
        },
        key: 'id'
      },
      allowNull: false
    })
  }
};
