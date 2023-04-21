const express = require('express');

/* -------------- Controllers -------------- */

const userController = require('./controllers/userController');
const familyController = require('./controllers/familyController');
const questController = require('./controllers/questController');
const collectionController = require('./controllers/collectionController');
const shopController = require('./controllers/shopController');
const transactionController = require('./controllers/transactionController');
const authController = require('./controllers/authController');
const adminController = require('./controllers/adminController');

/* -------------- Middlewares -------------- */

const tokenMiddleware = require('./middlewares/tokenMiddleware');

/* -------------- Routes -------------- */

const router = express.Router();

/** Users */
router.get('/users',  userController.getAllUsers);
router.get('/user/:id',  userController.getOneUser);
router.post('/user',  userController.createUser);
router.put('/user/:id',  userController.modifyUser);
router.delete('/user/:id',  userController.deleteUser);
router.post('/user/add-friend',  userController.addFriend);


/** Families */
router.get('/families', familyController.getAllFamilies);
router.get('/family/:id', familyController.getOneFamily);
router.post('/family', familyController.createFamily);
router.put('/family/:id', familyController.modifyFamily);
router.delete('/family/:id', familyController.deleteFamily);

/** Quests */
router.get('/quests', tokenMiddleware, questController.getAllQuests);
router.get('/quest/:id', tokenMiddleware, questController.getOneQuest);
router.post('/quest', tokenMiddleware, questController.createQuest);
router.put('/quest/:id', tokenMiddleware, questController.modifyQuest);
router.delete('/quest/:id', tokenMiddleware, questController.deleteQuest);

/** Collections */
router.get('/collections', tokenMiddleware, collectionController.getAllCollections);
router.get('/collection/:id', tokenMiddleware, collectionController.getOneCollection);
router.post('/collection', tokenMiddleware,collectionController.createCollection);
router.put('/collection/:id', tokenMiddleware,collectionController.modifyCollection);
router.delete('/collection/:id', tokenMiddleware,collectionController.deleteCollection);

/** Shops */
router.get('/shops', tokenMiddleware, shopController.getAllItemShop);
router.get('/shop/:id', tokenMiddleware,shopController.getOneItem);
router.post('/shop/:id', tokenMiddleware,shopController.addItemToShop);
router.delete('/shop/:id', tokenMiddleware, shopController.deleteItemFromShop);

/** Transactions */
router.get('/transactions', tokenMiddleware, transactionController.getAllTransactions);
router.get('/transaction/:id', tokenMiddleware, transactionController.getOneTransaction);
router.post('/transaction', tokenMiddleware, transactionController.createTransaction);
router.put('/transaction/:id', tokenMiddleware,transactionController.modifyTransaction);
router.delete('/transaction/:id', tokenMiddleware, transactionController.deleteTransaction);

/** Authentification */
router.post('/signup', authController.signupUser);
router.post('/login', authController.loginUser);
router.post('/token/refresh', authController.refreshToken);
router.post('/logout', authController.deleteToken)

/** Back office */
router.get('/admin/home', adminController.homePage);
router.get('/admin/family', adminController.familyPage);
router.get('/admin/user', adminController.userPage);
router.get('/admin/quest', adminController.questPage);


module.exports = router;
