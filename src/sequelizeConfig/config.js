const { Sequelize } = require('sequelize');

const database = (process.env.DB_MODE === 'development') ? process.env.DEV_POSTGRES_DATABASE : process.env.POSTGRES_DATABASE;
const username = (process.env.DB_MODE === 'development') ? process.env.DEV_POSTGRES_USER : process.env.POSTGRES_USER;
const password = (process.env.DB_MODE === 'development') ? process.env.DEV_POSTGRES_PASSWORD : process.env.POSTGRES_PASSWORD;
const host = (process.env.DB_MODE === 'development') ? process.env.DEV_POSTGRES_HOST : process.env.POSTGRES_HOST;

const sequelize = new Sequelize(database, username, password, {
    host: host,
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});

module.exports = sequelize;
