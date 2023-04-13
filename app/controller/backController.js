const controller = {
    async getHome(_, res) {
        res.render("form/home");
    },
    async getSignin(_,res){
        res.render("form/signin");
    },
    async getSignup(_,res){
        res.render("form/signup");
    },
};

module.exports = controller;