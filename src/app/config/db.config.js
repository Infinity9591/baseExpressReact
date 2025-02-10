const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('baseExpressReact', 'root', '', {
    host: 'localhost',
    port: '3308',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000,
    },
});

sequelize.authenticate().then(async () => {
    try {
        console.log('Connection has been established successfully.');
    } catch (err) {
        console.error('Unable to connect to the database:', err);
    }
});

module.exports = { sequelize };
