const { User, Shop, Transaction, Family, Collection, Quest } = require("../models");

const adminController = {
    homePage: (req, res) => {
        res.render("home");
    },

    familyPage: async (req, res) => {
        try {
            const families = await Family.findAll();
            res.render("family", { 
                families,
                defaultFamilyName: "",
                defaultFamilyMembers: [],
                defaultFamilyLevel: ""});
        } catch (error) {
            console.error(error);
            console.trace(error);
            res.status(500).json(error);
        } 
    },

    userPage: async (req, res) => {
        try {
            const users = await User.findAll();
            res.render("user", {usersList: users});
        } catch (error) {
            console.error(error);
            console.trace(error);
            res.status(500).json(error);
        }
    },

    questPage: async (req, res) => {
        try {
            const quests = await Quest.findAll();
            const collections = await Collection.findAll();
            res.render("quest", { quests, collections })
        } catch(error) {
            console.trace(error);
        }
    },

}

module.exports = adminController;