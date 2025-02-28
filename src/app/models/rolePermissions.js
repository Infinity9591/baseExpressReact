const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.config');
const Roles = require('./roles');
const Permissions = require('./permissions');
// const { tableLogsSync } = require('./tableLogs');
// import {tableLogsSync} from './tableLogs.js'
// const Roles = require('./roles');
// const Permissions = require('./permissions');

const RolePermissions = sequelize.define(
    'role_permission',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        // role_id : {
        //     type: DataTypes.STRING,
        //     references: {
        //         model: Roles,
        //         key: "id"
        //     }
        // },
        // permission_id : {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: Permissions,
        //         key: "permission_id"
        //     }
        // },
        table_name: {
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

// RolePermissions.associate = (models) => {
//     RolePermissions.belongsTo(Roles, {foreignKey: 'role_id'});
//     RolePermissions.belongsTo(Permissions, {foreignKey: 'permission_id'});
// };

RolePermissions.belongsTo(Roles, {
    foreignKey: 'role_id',
});

RolePermissions.belongsTo(Permissions, {
    foreignKey: 'permission_id',
});

// RolePermissions.addHook('afterUpdate', async (instance) => {
//     await tableLogsSync;
// });
//
// RolePermissions.addHook('afterCreate', async (instance) => {
//     await tableLogsSync;
// });

module.exports = RolePermissions;
