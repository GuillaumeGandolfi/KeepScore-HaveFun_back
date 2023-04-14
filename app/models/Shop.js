const { Model, DataTypes } = require('sequelize');
const sequelize = require("../database");


class Shop extends Model { }

Shop.init({
    description: DataTypes.TEXT,
    price: DataTypes.INTEGER
}, {
    sequelize,
    tableName: "shop"
});

module.exports = Shop;