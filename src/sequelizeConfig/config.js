const { Sequelize } = require('sequelize');

const database = process.env.HEROKU_POSTGRES_DATABASE;
const username = process.env.HEROKU_POSTGRES_USER;
const password = process.env.HEROKU_POSTGRES_PASSWORD;
const host = process.env.HEROKU_POSTGRES_HOST;

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
