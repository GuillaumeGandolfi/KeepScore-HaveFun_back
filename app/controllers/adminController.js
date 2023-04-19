const { User, Shop, Transaction, Family, Collection, Quest } = require("../models");

const adminController = {
    homePage: (req, res) => {
        res.render("home");
    },

    familyPage: async (req, res) => {
        try {
            const families = await Family.findAll();
            res.render("family", { families });
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

}

module.exports = adminController;