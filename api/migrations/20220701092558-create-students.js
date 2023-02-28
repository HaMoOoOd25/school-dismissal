'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface.createTable('classes', {
            id: {
                allowNull: false,
                autoIncrement: false,
                primaryKey: true,
                type: Sequelize.UUID,
                default: Sequelize.UUIDV4
            },
            name: {
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


        await queryInterface.createTable('students', {
            id: {
                type: Sequelize.UUID,
                default: Sequelize.UUIDV4,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            ClassId: {
                type: Sequelize.UUID,
                references: {
                    model: 'classes',
                    key: 'id'
                }
            }
        })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('classes');
    }
};
