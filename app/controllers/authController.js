const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models');
const Joi = require("joi");

// Schema du mot de passe
const schema = Joi.object({
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    email: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')),
});

const authController = {

    signupUser: async (req, res) => {
        try {
            const { email, firstname, lastname, password, confirmation } = req.body;
            const bodyErrors = [];

            // Test des saisies utilisateurs
            if (!email || !firstname || !lastname || !password || password != confirmation) {
                bodyErrors.push('All fields are required');
            }

            // On vérifie si l'email est déjà prise :
            const user = await User.findOne({ where: {email:email}});
            if(user) {
                bodyErrors.push('email already used');
            }

            // On vérifie si l'email est conforme : 
            const emailResult = schema.validate({ email: email });
            if (emailResult.error) {
                bodyErrors.push('Adresse email non conforme');
                console.log(emailResult.error.details[0].message) 
            }

            const result = schema.validate({ password: password });
            if (result.error) {
            bodyErrors.push('Mot de passe non conforme');
            console.log(result.error.details[0].message); // "Mot de passe doit contenir au moins 3 caractères"
            }

            // On vérifie si il y a eu des erreurs
            if ( bodyErrors.length) {
                console.log(bodyErrors);
                res.status(400).json(bodyErrors);
            } else {
                const encodedPassword = bcrypt.hashSync(password, 5);
                let newUser = User.build({      // On crée une instance avec le .build
                    email,
                    firstname,
                    lastname,
                    password:encodedPassword
                });
                await newUser.save();            // On enregistre l'instance crée dans la db
                // TODO! Choix route /login front ou back 
                res.redirect('/login');
                res.status(200).json({ newUser });
            }
        } catch (error) {
            console.trace(error);
            res.status(500).json(error.toString());
        }
    },
    // Méthode pour se logger
    loginUser: async (req, res) => {
        // On récupère les infos soumises dans le body
        const { email, password } = req.body;

        try {
            // On commence par vérifier que les champs soient bien remplis
            if (!email || !password) {
                return res.status(400).json('All fields are required');
            }

            // Si c'est ok, on vérifie qu'un utilisateur est associé à l'email saisie dans la bdd
            const user = await User.findOne({ where: { email } });
            // S'il cet utilisateur n'existe pas
            if (!user) {
                return res.status(401).json('Incorrect email or password');
            }

            // Maintenant on vérifie le mot de passe
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json('Incorrect email or password');
            }

            // Et maintenant on créer et on envoie un token pour l'utilisateur
            const token = jwt.sign({ userId: user.id }, 'secret-key');
            res.status(200).json({ token, user });
        } catch (error) {
            console.error(error);
            console.trace(error);
            res.status(500).json(error);
        }
    }
}

module.exports = authController;