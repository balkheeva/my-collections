'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.addColumn(
        'Items', // name of Source model
        'CollectionId', // name of the key we're adding
        {
          type: Sequelize.UUID,
          references: {
            model: 'Collections', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onDelete: 'cascade',
        }
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.removeColumn(
        'Items', // name of Source model
        'CollectionId' // key we want to remove
    );
  }
};
