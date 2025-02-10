const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.config');
const lodash = require('lodash');

function getDifference(arr1, arr2) {
    const set1 = new Set(arr1);
    const set2 = new Set(arr2);

    return [
        ...arr1.filter((item) => !set2.has(item)),
        ...arr2.filter((item) => !set1.has(item)),
    ];
}

const TableLogs = sequelize.define(
    'table_log',
    {
        table_name: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        // description: {
        //     type: DataTypes.STRING,
        //     allowNull : true,
        // },
    },
    {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
        freezeTableName: true,
    },
);

const tableLogsSync = TableLogs.sync({ alter: true }).then(async () => {
    try {
        const filters = ['table_log', 'role', 'permission', 'role_permission'];
        const database_table_names = await sequelize
            .getQueryInterface()
            .showAllTables();
        const table_names = database_table_names.filter(
            (name) => !filters.includes(name),
        );
        for (const tableName of table_names) {
            const exists = await TableLogs.findOne({
                where: { table_name: tableName },
            });
            if (!exists) {
                await TableLogs.create({ table_name: tableName });
            }
        }

        const tableLogs_table_names = await TableLogs.findAll();
        const results = await Promise.all(
            tableLogs_table_names.map(async (result) => {
                return result.table_name;
            }),
        );
        const table_names_from_tableLog = table_names.filter(
            (name) => !filters.includes(name),
        );
        const diff = lodash.xor(results, table_names_from_tableLog);
        if (diff) {
            for (const tableName of diff) {
                const exists = await TableLogs.findOne({
                    where: { table_name: tableName },
                });
                await exists.destroy();
            }
        }
        console.log('TableLogs sync successfully.');
    } catch (e) {}
});

// tableLogsSync();

module.exports = { TableLogs, tableLogsSync };
