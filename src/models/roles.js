const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.config');

const Roles = sequelize.define(
    'role',
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: {
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

module.exports = Roles;
