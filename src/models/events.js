const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../sequelizeConfig/config');

const Events = sequelize.define('event', {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    eventName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    addedBy: {
        type: DataTypes.STRING,
        allowNull: false
    },
    eventStartDate: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

module.exports = Events;
