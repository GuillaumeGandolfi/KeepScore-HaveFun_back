const { Model, DataTypes } = require('sequelize');
const sequelize = require("../database");


class Transaction extends Model { }

Transaction.init({
    date: DataTypes.DATE,
    operation: DataTypes.INTEGER

}, {
    sequelize,
    tableName: "transaction"
});

module.exports = Transaction;