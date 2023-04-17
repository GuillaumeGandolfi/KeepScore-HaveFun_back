const { Family } = require("../models");

const familyController = {
    getAllFamilies: async (req, res) => {
        try {
            const families = await Family.findAll({
                include: {
                    association: "members"
                }
            });
            res.status(200).json(families);
        } catch(error) {
            console.error(error);
            console.trace(error);
            res.status(500).json(error);
        }
    },
}

module.exports = familyController;