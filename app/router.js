const express = require('express');

/* -------------- Controllers -------------- */

const userController = require('./controllers/userController');
const familyController = require('./controllers/familyController');
const questController = require('./controllers/questController');


/* -------------- Routes -------------- */

const router = express.Router();

/** Users */
router.get('/users', userController.getAllUsers);
router.get('/user/:id', userController.getOneUser);
router.post('/users', userController.createUser);
router.put('/user/:id', userController.modifyUser);
router.delete('/user/:id', userController.deleteUser);

/** Families */
router.get('/families', familyController.getAllFamilies);
router.get('/family/:id', familyController.getOneFamily);
router.post('/family', familyController.createFamily);
router.put('/family/:id', familyController.modifyFamily);
router.delete('/family/:id', familyController.deleteFamily);

/** Quests */
router.get('/quests', questController.getAllQuests);
router.get('/quest/:id', questController.getOneQuest);
router.post('quest', questController.createQuest);


module.exports = router;