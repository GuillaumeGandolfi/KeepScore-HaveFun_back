// const sectionDatamapper = require("../model/section");
const userDatamapper = require("../model/user");

const controller = {
    getHome (req,res){
        res.render('form/admin');
    },
    getUser (req,res){
        res.render('form/user');
    },
    async signup(req,res){
        /*const { firstname, lastname, password, email } = request.body; */
        const newUser = {
            firstname:req.body.name,
            lastname:req.body.lastname,
            mail:req.body.email,
            password:req.body.password
        }
        const user = await userDatamapper.create(newUser);

        if(user){
            req.session.user = { name:user.name,lastname:user.lastname};

            res.redirect("/");
        }
        else{
            // j'informe l'utilisateur qu'il y a eu un problème
        }
    },
    async signin(req, res) {
        const loginInformations = req.body;
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><',req.body)

        const user = await userDatamapper.signin(loginInformations.email, loginInformations.password);
        console.log(user);
        
        if (user) {
            console.log("ifuser");
            console.log(req.session)
            // je place les informations de l'utilisateur au sein de la session
            req.session.user = user;
            // je redirige l'utilisateur suivant son rôle
            switch (user.isAdmin) {
                case "true":
                    console.log("true");
                    res.send("form/admin");
                    break;
                default:
                    res.send("/");
                    break;
            }
        }
        else {
            // il y a eu un problème à l'authentification, on retourne une erreur à l'utilisateur
        }
    },
    
};

module.exports = controller;