const express = require('express');

/* -------------- Controllers -------------- */

const userController = require('./controllers/userController');
const familyController = require('./controllers/familyController');


/* -------------- Routes -------------- */

const router = express.Router();

/** Users */
router.get('/users', userController.getAllUsers);
router.get('/user/:id', userController.getOneUser);
router.post('/users', userController.createUser);
router.put('/user/:id', userController.modifyUser);
router.delete('/user/:id', userController.deleteUser);





router.get('/families', familyController.getAllFamilies);
router.get('/family/:id', familyController.getOneFamily);
router.post('/family', familyController.createFamily);


module.exports = router;