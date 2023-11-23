const Sequelise = require('sequelize');
const sequelize = require('../util/database');

const Msg = sequelize.define('Message', {
    id: {
        type: Sequelise.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    senderId: {
        type: Sequelise.INTEGER,
        allowNull: false,
    },
    senderName: {
        type: Sequelise.STRING,
        allowNull: false,
    },
    receiverId: {
        type: Sequelise.INTEGER,
        allowNull: false,
    },
    receiverName: {
        type: Sequelise.STRING,
        allowNull: false,
    },
    messageContent: {
        type: Sequelise.TEXT,
        allowNull: false,
    },
    timestamp: {
        type: Sequelise.STRING,
        allowNull: false,
    }
});

module.exports = Msg;