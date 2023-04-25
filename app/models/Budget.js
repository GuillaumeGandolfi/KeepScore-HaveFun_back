const { Model, DataTypes } = require('sequelize');
const sequelize = require("../database");


class Budget extends Model { }

Budget.init({
    value: DataTypes.INTEGER,
    label: DataTypes.TEXT

}, {
    sequelize,
    tableName: "budget"
});

module.exports = Budget;