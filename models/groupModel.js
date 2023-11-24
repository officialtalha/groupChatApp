const Sequelise = require('sequelize');
const sequelize = require('../util/database');

const Grp = sequelize.define('Group', {
    id: {
        type: Sequelise.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    groupName: {
        type: Sequelise.STRING,
        allowNull: false,
    },
    adminId: {
        type: Sequelise.INTEGER,
        allowNull: false,
    },
});
module.exports = Grp;