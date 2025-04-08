'use strict';

const { DataTypes } = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(
            'permissions_for_role',
            {
                id: {
                    autoIncrement: true,
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                },
                id_role: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                },
                id_permission: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                },
                source_name: {
                    type: DataTypes.STRING(255),
                    allowNull: true,
                },
            },
            {},
        );
        await queryInterface.addColumn('permissions_for_role', 'created_at', {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        });

        await queryInterface.addColumn('permissions_for_role', 'updated_at', {
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
