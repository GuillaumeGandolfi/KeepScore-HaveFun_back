const express = require('express');

/* -------------- Controllers -------------- */

const userController = require('./controllers/userController');
const familyController = require('./controllers/familyController');


/* -------------- Routes -------------- */

const router = express.Router();

router.get('/users', userController.getAllUsers);
router.get('/user/:id', userController.getOneUser);


router.get('/families', familyController.getAllFamilies);
router.get('/family/:id', familyController.getOneFamily);
router.post('/family', familyController.createFamily);
router.put('/family/:id', familyController.modifyFamily);
router.delete('/family/:id', familyController.deleteFamily);


module.exports = router;