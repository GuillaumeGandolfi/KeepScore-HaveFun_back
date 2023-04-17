const express = require('express');

/* -------------- Controllers -------------- */

const userController = require('./controllers/userController');
const familyController = require('./controllers/familyController');
const collectionController = require('./controllers/collectionController');



/* -------------- Routes -------------- */

const router = express.Router();

/** Users */
router.get('/users', userController.getAllUsers);
router.get('/user/:id', userController.getOneUser);
router.post('/users', userController.createUser);
router.put('/user/:id', userController.modifyUser);
router.delete('/user/:id', userController.deleteUser);

/** Collections */
router.get('/collections', collectionController.getAllCollections);
router.get('/collection/:id', collectionController.getOneCollection);
router.post('/collections', collectionController.createCollection);
router.put('/collection/:id', collectionController.modifyCollection);
router.delete('/collection/:id', collectionController.deleteCollection);




/** Family */
router.get('/families', familyController.getAllFamilies);
router.get('/family/:id', familyController.getOneFamily);
router.post('/family', familyController.createFamily);
router.put('/family/:id', familyController.modifyFamily);
router.delete('/family/:id', familyController.deleteFamily);


module.exports = router;