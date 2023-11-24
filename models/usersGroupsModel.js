const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const UsersGroups = sequelize.define('users_groups', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    }
});

module.exports = UsersGroups;