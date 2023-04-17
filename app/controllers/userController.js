const { User, Shop, Transaction, Family, Collection, Quest } = require("../models");

const userController = {
    getAllUsers: async (req, res) => {
        try {
            console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',User);
            const users = await User.findAll();
            res.status(200).json(users);
        } catch (error) {
            console.error(error);
            console.trace(error);
            res.status(500).json(error);
        }
    },

    getOneUser: async (req, res) => {
        try {
            const userId = req.params.id;
            console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',userId);

            const user = await User.findByPk(userId, {
                include: [
                    "operations",
                    "family",
                    {association: "friends"},
                    {association: "quests"},
                    {association: "items_collection"},
                    // {association: "items_shop"}
                ]
                
            });
            res.status(200).json(user);
            
        } catch (error) {
            console.error(error);
            console.trace(error);
            res.status(500).json(error);
        } 
    },
    createUser: async (req, res) => {
        try {
            const { email, firstname, lastname, password } = req.body;
            const bodyErrors = [];

            if (!email) {
                bodyErrors.push('email can not be empty');
            }
            if (!firstname) {
                bodyErrors.push('firstname can not be empty');
            }
            if (!password) {
                bodyErrors.push('password can not be empty');
            }
            if ( bodyErrors.length) {
                res.status(400).json(bodyErrors);
            } else {
                let newUser = User.build({
                    email,
                    firstname,
                    lastname,
                    password
                });
            }

        }
    },

    // async renderQuizPage(req, res) {

    //     const id = req.params.id
    
    //     const quiz = await Quiz.findByPk(id,{
    //       include: [
    //         "author",
    //         "tags",
    //         {association: "questions", include: ['propositions','level']}
    //         ]});
    //     // J'envoie les données à la vue nommée home.ejs
    //     res.render("quiz",{ quiz });
    //   },
}

module.exports = userController;