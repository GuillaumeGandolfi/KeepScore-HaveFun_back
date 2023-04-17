const express = require('express');

/* -------------- Controllers -------------- */

const userController = require('./controllers/userController');


/* -------------- Routes -------------- */

const router = express.Router();

/** Users */
router.get('/users', userController.getAllUsers);
router.get('/user/:id', userController.getOneUser);
router.post('/users', userController.createUser);
router.put('/user/:id', userController.modifyUser);
router.delete('/user/:id', userController.deleteUser);





module.exports = router;