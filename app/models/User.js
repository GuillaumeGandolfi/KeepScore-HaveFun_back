const { Model, DataTypes } = require('sequelize');
const sequelize = require("../database");


class User extends Model { }

User.init({
    email: DataTypes.TEXT,
    firstname: DataTypes.TEXT,
    lastname: DataTypes.TEXT,
    password: DataTypes.TEXT,
    level: DataTypes.INTEGER,
    wallet: DataTypes.INTEGER
}, {
    sequelize,
    tableName: "user"
});

module.exports = User;