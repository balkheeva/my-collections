'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.addColumn(
      'Comments', // name of Source model
      'itemId', // name of the key we're adding
      {
        type: Sequelize.UUID,
        references: {
          model: 'Items', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.removeColumn(
      'Comments', // name of Source model
      'itemId', // key we want to remove
    );
  },
};
