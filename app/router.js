const express = require('express');

/* -------------- Controllers -------------- */

const userController = require('./controllers/userController');


/* -------------- Routes -------------- */

const router = express.Router();

router.get('/users', userController.getAllUsers);
router.get('/user/:id', userController.getOneUser);


module.exports = router;