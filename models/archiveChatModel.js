const Sequelise = require('sequelize');
const sequelize = require('../util/database');

const ArchiveChat = sequelize.define('ArchiveChat', {
    id: {
        type: Sequelise.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    senderName: {
        type: Sequelise.STRING,
        allowNull: false,
    },
    receiverName: {
        type: Sequelise.STRING,
        allowNull: true,
    },
    messageContent: {
        type: Sequelise.TEXT,
        allowNull: false,
    },
    timeStamp: {
        type: Sequelise.DATE,
        allowNull: false,
    }
});

module.exports = ArchiveChat;