const { Model, DataTypes } = require('sequelize');
const sequelize = require("../database");

class UserQuest extends Model {
    static init(sequelize) {
        return super.init(
            {
                user_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: 'User',
                        key: 'id',
                    },
                },
                quest_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: 'Quest',
                        key: 'id',
                    },
                },
                created_at: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    defaultValue: DataTypes.NOW,
                },
                updated_at: {
                    type: DataTypes.DATE,
                    allowNull: true,
                    defaultValue: null,
                },
            },
            {
                sequelize,
                tableName: "user_has_quest",
                timestamps: true, // si tu souhaites utiliser des timestamps pour created_at et updated_at
            }
        );
    }

    static associate(models) {
        // définit les relations avec d'autres modèles
    }
}


module.exports = UserQuest;
