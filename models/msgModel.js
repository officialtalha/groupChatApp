const Sequelise = require('sequelize');
const sequelize = require('../util/database');

const Msg = sequelize.define('msg', {
    message: {
        type: Sequelise.STRING,
        allowNull: false
    }
});

module.exports = Msg;