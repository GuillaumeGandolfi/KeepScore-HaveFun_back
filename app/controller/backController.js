
const controller = {
    async getHome(req,res){
        res.render("form/signin");
    },
    async getHome1(req,res){
        res.render("form/signup");
    },
};

module.exports = controller;