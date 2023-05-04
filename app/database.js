const { Sequelize } = require('sequelize');

const PG_URL = process.env.DATABASE_URL || "postgresql://postgres:8ugfcb6DvJlRenGPJA2t@containers-us-west-173.railway.app:5735/railway";

const defineAttributes = {
    define: {
        underscored: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
}

const sequelize = new Sequelize(PG_URL, defineAttributes) // Example for postgres

module.exports = sequelize;