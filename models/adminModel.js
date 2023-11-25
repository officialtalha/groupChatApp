const Sequelise = require('sequelize');
const sequelize = require('../util/database');

const Admin = sequelize.define('admin', {
    id: {
        type: Sequelise.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    }
});
module.exports = Admin;