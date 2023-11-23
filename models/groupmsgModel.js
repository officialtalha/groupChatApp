const Sequelise = require('sequelize');
const sequelize = require('../util/database');

const GrpMsg = sequelize.define('Groupmsg', {
    id: {
        type: Sequelise.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    GroupId: {
        type: Sequelise.INTEGER,
        allowNull: false,
    },
    senderId: {
        type: Sequelise.INTEGER,
        allowNull: false,
    },
    senderName: {
        type: Sequelise.STRING,
        allowNull: false,
    },
    msgContent: {
        type: Sequelise.STRING,
        allowNull: false,
    },
    timeStamp: {
        type: Sequelise.STRING,
        allowNull: false,
    }
});

module.exports = GrpMsg;