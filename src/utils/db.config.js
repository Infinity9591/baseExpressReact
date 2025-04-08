const { Sequelize } = require('sequelize');
const configDB = require('../../config/database');

const sequelize = new Sequelize(
    configDB.database,
    configDB.username,
    configDB.password,
    {
        host: configDB.host,
        port: configDB.port,
        dialect: configDB.dialect,
    },
);

sequelize.authenticate().then(async () => {
    try {
        console.log('Connection has been established successfully.');
    } catch (err) {
        console.error('Unable to connect to the database:', err);
    }
});

module.exports = sequelize;
