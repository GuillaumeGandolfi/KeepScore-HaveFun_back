// Variables environnemment
require("dotenv").config();
const express = require("express");
const routerUser = require("./app/router/user");
const bodyParser = require("body-parser");

// import du module
const session = require('express-session')
// configuration de la session
const sessionMiddleware = session({
    secret : 'KeepScore&HaveFun',
    resave: true,
    saveUninitialized : true,
    cookie : {
        secure : false ,// http mode doesn't require it 
        maxAge : (1000*60*60) // durée de la session en millisecondes - 1 heure
    }
});


const app = express();

// intégration du middleware pour les sessions
app.use(sessionMiddleware);

app.use(bodyParser.urlencoded({extended: false}));

app.set('view engine', 'ejs');
app.set('views', './app/view');



app.use(express.static('public'));

app.use(routerUser);







const PORT = process.env.PORT ?? 3000;
app.listen(3000, ()=>{
    console.log(`Le serveur tourne sur le port : ${PORT}`)
});