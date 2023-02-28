'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      NFC_code: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.addColumn('students', 'CardId', {
        type: Sequelize.INTEGER,
        references: {
            model: 'cards',
            key: 'id'
        }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('cards');
  }
};