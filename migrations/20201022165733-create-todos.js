'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Todo', {
      /* eslint-disable */
      id: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        unique: true
      },
      todo: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      priority: {
        type: Sequelize.DataTypes.STRING,
        defaultValue: 'Medium'
      },
      date_added: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
        defaultValue: new Date()
      },
      is_completed: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false
      },
      user_index: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: {
            tableName: 'User',
          },
          key: 'id'
        },
        allowNull: false
      }
      /* eslint-enable */
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Todo')
  }
}
