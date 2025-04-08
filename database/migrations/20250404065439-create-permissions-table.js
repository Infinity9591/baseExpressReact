'use strict';

const { DataTypes } = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(
            'permissions',
            {
                id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                },
                permission_name: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                },
            },
            {},
        );
        await queryInterface.addColumn('permissions', 'created_at', {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        });

        await queryInterface.addColumn('permissions', 'updated_at', {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal(
                'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
            ), // MySQL/MariaDB
            // PostgreSQL dùng: defaultValue: Sequelize.literal('NOW()')
        });
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
    },
};
