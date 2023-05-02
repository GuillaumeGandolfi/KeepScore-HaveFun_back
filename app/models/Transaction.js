const { Model, DataTypes } = require('sequelize');
const sequelize = require("../database");


class Transaction extends Model { }

Transaction.init({
    amount: DataTypes.INTEGER,
    name: DataTypes.TEXT

}, {
    sequelize,
    tableName: "transaction"
});

module.exports = Transaction;