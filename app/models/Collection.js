const { Model, DataTypes } = require('sequelize');
const sequelize = require("../database");

class Collection extends Model { }


Collection.init({
    description: DataTypes.TEXT,
    category: DataTypes.TEXT
}, {
    sequelize,
    tableName: "collection"
});

module.exports = User;

