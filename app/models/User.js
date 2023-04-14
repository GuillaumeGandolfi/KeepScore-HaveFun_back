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

// email: {
//     type: DataTypes.TEXT,
//     allowNull: false,
//     validate: {
//       is: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
//      Je sais pas si la regex est bonne mais on verra plus tard ça
//     },
//   },

// Avec cette définition de modèle, Sequelize va générer une table user avec un champ email qui utilise le domaine email_domain 
// avec la contrainte CHECK définie dans le domaine.

// User.init({
//     email: {
//         type: DataTypes.DOMAIN('email_domain'),
//         allowNull: false
//     },