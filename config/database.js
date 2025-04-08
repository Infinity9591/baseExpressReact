require('dotenv').config({
    path: require('path').resolve(__dirname, '../.env'),
}); // Load biến từ .env

const env = process.env.NODE_ENV;

const config = {
    development: {
        username: process.env.DB_DEV_USERNAME,
        password: process.env.DB_DEV_PASSWORD,
        database: process.env.DB_DEV_DBNAME,
        host: process.env.DB_DEV_HOST,
        port: process.env.DB_DEV_PORT,
        dialect: process.env.DB_DIALECT || 'mysql',
        directory: false,
        additional: {
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    },
    test: {
        username: process.env.DB_TEST_USERNAME,
        password: process.env.DB_TEST_PASSWORD,
        database: process.env.DB_TEST_DBNAME,
        host: process.env.DB_TEST_HOST,
        port: process.env.DB_TEST_PORT,
        dialect: process.env.DB_DIALECT || 'mysql',
    },
    production: {
        username: process.env.DB_PROD_USERNAME,
        password: process.env.DB_PROD_PASSWORD,
        database: process.env.DB_PROD_DBNAME,
        host: process.env.DB_PROD_HOST,
        port: process.env.DB_PROD_PORT,
        dialect: process.env.DB_DIALECT || 'mysql',
    },
};

module.exports = config[env];
