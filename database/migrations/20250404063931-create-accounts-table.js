'use strict';

const { DataTypes } = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(
            'accounts',
            {
                id: {
                    autoIncrement: true,
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                },
                username: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                },
                password_hash: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                },
                is_active: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                person_name: {
                    type: DataTypes.STRING(255),
                    allowNull: true,
                },
                birthday: {
                    type: DataTypes.DATEONLY,
                    allowNull: true,
                },
                phone_number: {
                    type: DataTypes.STRING(11),
                    allowNull: true,
                },
                email: {
                    type: DataTypes.STRING(255),
                    allowNull: true,
                },
                address: {
                    type: DataTypes.TEXT,
                    allowNull: true,
                },
                id_role: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                },
            },
            {},
        );

        await queryInterface.addColumn('accounts', 'created_at', {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        });

        await queryInterface.addColumn('accounts', 'updated_at', {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal(
                'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
            ),
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('accounts');
    },
};
