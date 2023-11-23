const Sequelise = require('sequelize');
// const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const Grp = sequelize.define('Group', {
    id: {
        type: Sequelise.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    GroupName: {
        type: Sequelise.STRING,
        allowNull: false,
    },
    adminId: {
        type: Sequelise.INTEGER,
        allowNull: false,
    },
    members: {
        type: Sequelise.TEXT, // Store members as a JSON-encoded string
        allowNull: false,
        get: function () {
            return JSON.parse(this.getDataValue('members'));
        },
        set: function (value) {
            this.setDataValue('members', JSON.stringify(value));
        }
    }
});

module.exports = Grp;