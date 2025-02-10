const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.config');
const Roles = require('./roles');

const Accounts = sequelize.define(
    'account',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password_hash: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        is_active: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        // slug : {
        //     type : DataTypes.STRING,
        // }
    },
    {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
        freezeTableName: true,
    },
);

Accounts.belongsTo(Roles, {
    foreignKey: 'role_id',
});

// Accounts.associate = (models) => {
//     Accounts.belongsToMany(models.Roles, { through: "UserRoles" });
// };

module.exports = Accounts;
