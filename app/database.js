const { Sequelize } = require('sequelize');

const PG_URL = process.env.DATABASE_URL || "postgresql://postgres:xj4foYLR6M4sopqoxv8s@containers-us-west-203.railway.app:7137/railway";

const defineAttributes = {
    define: {
        underscored: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
}

const sequelize = new Sequelize(PG_URL, defineAttributes) // Example for postgres

module.exports = sequelize;