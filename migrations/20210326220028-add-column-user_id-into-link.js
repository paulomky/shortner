'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.addColumn('links', 'user_id', {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  }),

  down: async (queryInterface, Sequelize) => queryInterface.removeColumn('links', 'user_id'),
};
