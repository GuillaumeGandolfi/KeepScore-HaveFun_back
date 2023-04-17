// const {User, Collection, Quest, Shop, Transaction, Family} = require("./") 

const User = require("./User");
const Collection = require("./Collection");
const Quest = require("./Quest");
const Shop = require("./Shop");
const Transaction = require("./Transaction");
const Family = require("./Family");

// Family <-> User (One-To-Many)
User.belongsTo(Family, {
    foreignKey: 'family_id',
    as: 'family'
});

Family.hasMany(User, {
    foreignKey: 'family_id',
    as: 'members'
});


// User <-> Friend (Many-To-Many)
User.belongsToMany(User, {
    foreignKey: "user_id",
    otherKey: "friend_id",
    as: "friends",
    through: "user_has_friend"
});


// Transaction <-> User (One-To-Many)
Transaction.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user'
});

User.hasMany(Transaction, {
    foreignKey: 'user_id',
    as: 'operations'
});

// User <-> Quest (Many-To-Many)
User.belongsToMany(Quest, {
    foreignKey: "user_id",
    otherKey: "quest_id",
    as: "quests",
    through: "user_has_quest"
});

Quest.belongsToMany(User, {
    foreignKey: "quest_id",
    otherKey: "user_id",
    as: "users",
    through: "user_has_quest"
});

// User <-> Collection (Many-To-Many)

User.belongsToMany(Collection, {
    foreignKey: "user_id",
    otherKey: "collection_id",
    as: "items_collection",
    through: "user_has_collection"
});

Collection.belongsToMany(User, {
    foreignKey: "collection_id",
    otherKey: "user_id",
    as: "users",
    through: "user_has_collection"
});

// User <-> Shop (Many-To-Many)

User.belongsToMany(Shop, {
    foreignKey: "user_id",
    otherKey: "shop_id",
    as: "items_shop",
    through: "user_has_shop"
});

Shop.belongsToMany(User, {
    foreignKey: "shop_id",
    otherKey: "user_id",
    as: "users",
    through: "user_has_shop"
});

// Shop <-> Collection (One-To-Many)
Shop.belongsTo(Collection, {
    foreignKey: 'collection_id',
    as: 'shop',
    onDelete: 'CASCADE'
});

Collection.hasMany(Shop, {
    foreignKey: 'collection_id',
    as: 'items'
});

module.exports = { User, Collection, Quest, Shop, Transaction, Family };