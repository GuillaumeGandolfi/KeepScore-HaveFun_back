const { Shop } = require("../models");

const shopController = {
    getAllItemShop: async (req, res) => {
        try {
            const itemsShop = await Shop.findAll({});
            res.status(200).json(itemsShop);
        } catch (error) {
            console.error(error);
            console.trace(error);
            res.status(500).json(error);
        }
    },
}

module.exports = shopController;
