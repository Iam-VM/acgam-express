const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const Certs = sequelize.define('cert', {
    eventId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    recipientEmail: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Certs;
