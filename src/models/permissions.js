const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.config');

const Permissions = sequelize.define(
    'permission',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        action_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
        freezeTableName: true,
    },
);

module.exports = Permissions;
