const express = require('express');

/* -------------- Controllers -------------- */

const userController = require('./controllers/userController');
const familyController = require('./controllers/familyController');


/* -------------- Routes -------------- */

const router = express.Router();

router.get('/users', userController.getAllUsers);
router.get('/user/:id', userController.getOneUser);


router.get('/families', familyController.getAllFamilies);


module.exports = router;