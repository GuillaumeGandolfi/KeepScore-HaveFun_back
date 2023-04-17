const { User, Shop, Transaction, Family, Collection, Quest } = require("../models");


const collectionController = {
    getAllCollections: async (req, res) => {
        try {
            
        } catch(error) {
            console.trace(error);
            res.status(500).json(error.toString());
        }
    },
};


module.exports = collectionController;