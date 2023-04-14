const { Model, DataTypes } = require('sequelize');
const sequelize = require("../database");


class Transaction extends Model { }

Transaction.init({
    date: DataTypes.TIMESTAMP,
    operation: DataTypes.INTEGER,

}, {
    sequelize,
    tableName: "transaction"
});

module.exports = Transaction;