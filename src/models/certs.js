const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../sequelizeConfig/config');

const Certs = sequelize.define('cert', {
    id: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false
    },
    recipientName: {
        type: DataTypes.STRING,
        allowNull: false
    },
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
