const { Sequelize } = require('sequelize');
const env = process.env.NODE_ENV;

// const sequelize = new Sequelize('baseExpressReact', 'root', '', {
//     host: 'localhost',
//     port: '3308',
//     dialect: 'mysql',
//     pool: {
//         max: 5,
//         min: 0,
//         idle: 10000,
//     },
// });

const sequelize = new Sequelize(
    env === 'development' ? DB_DEV_DBNAME : DB_PROD_DBNAME,
    env === 'development' ? DB_DEV_USERNAME : DB_PROD_USERNAME,
    env === 'development' ? DB_DEV_PASSWORD : DB_PROD_PASSWORD,
    env === 'development' ? DB_DEV_NAME : DB_PROD_NAME,
)

sequelize.authenticate().then(async () => {
    try {
        console.log('Connection has been established successfully.');
    } catch (err) {
        console.error('Unable to connect to the database:', err);
    }
});

module.exports = { sequelize };
