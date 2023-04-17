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

    getOneFamily: async (req, res) => {
        try {
            const familyId = req.params.id;
            const family = await Family.findByPk(familyId, {
                include: {
                    association: "members"
                }
            });
            if (family) {
                res.status(200).json(family);
            } else {
                res.status(404).json('Family with the id: ' + familyId + 'does not exist');
            }
        } catch (error) {
            console.error(error);
            console.trace(error);
            res.status(500).json(error);
        }
    }
}

module.exports = familyController;