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
const budgetController = require('./controllers/budgetController');

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
router.post('/user/add-friend', tokenMiddleware,  userController.addFriend);


/** Families */
router.get('/families',  familyController.getAllFamilies);
router.get('/family/:id',  familyController.getOneFamily);
router.post('/family',  familyController.createFamily);
router.put('/family/:id',  familyController.modifyFamily);
router.delete('/family/:id',  familyController.deleteFamily);

/** Quests */
router.get('/quests',  questController.getAllQuests);
router.get('/quest/:id',  questController.getOneQuest);
router.post('/quest',  questController.createQuest);
router.put('/quest/:id',  questController.modifyQuest);
router.delete('/quest/:id',  questController.deleteQuest);

/** Collections */
router.get('/collections',  collectionController.getAllCollections);
router.get('/collection/:id',  collectionController.getOneCollection);
router.post('/collection', collectionController.createCollection);
router.put('/collection/:id', collectionController.modifyCollection);
router.delete('/collection/:id', collectionController.deleteCollection);

/** Shops */
router.get('/shops',  shopController.getAllItemShop);
router.get('/shop/:id', shopController.getOneItem);
router.post('/shop/:id', shopController.addItemToShop);
router.delete('/shop/:id',  shopController.deleteItemFromShop);

/** Transactions */
router.get('/transactions',  transactionController.getAllTransactions);
router.get('/transactions/budget/:id', transactionController.getAllTransactionsOfBudget);
router.get('/transaction/:id',  transactionController.getOneTransaction);
router.get('/transactions/user/:id', transactionController.getAllTransactionsOfUser);
router.get('/transaction/day/:id',tokenMiddleware, transactionController.getTransactionOfToday);
router.get('/transaction/week/:id',tokenMiddleware, transactionController.getTransactionOfWeek);
router.get('/transaction/month/:id',tokenMiddleware, transactionController.getTransactionOfMonth);
router.get('/transaction/year/:id',tokenMiddleware, transactionController.getTransactionOfYear);
router.post('/transaction',  transactionController.createTransaction);
router.put('/transaction/:id', transactionController.modifyTransaction);
router.delete('/transaction/:id',  transactionController.deleteTransaction);

/** Budget */
router.get('/budgets', budgetController.getAllBudgets);
router.get('/budget/:id', budgetController.getOneBudget);
router.get('/budget-user/:userId', budgetController.getAllBudgetsFromOneUser);
router.post('/budget', budgetController.createBudget);
router.put('/budget/:id', budgetController.modifyBudget);
router.delete('/budget/:id', budgetController.deleteBudget);

/** Authentification */
router.post('/signup', authController.signupUser);
router.post('/login', authController.loginUser);
router.post('/token/refresh', authController.refreshToken);
router.post('/logout', authController.deleteToken);

/** Back office */
router.get('/admin/home', adminController.homePage);
router.get('/admin/family', adminController.familyPage);
router.get('/admin/users', adminController.userPage);
router.get('/admin/quest', adminController.questPage);
router.get('/admin/shop', adminController.shopPage);



module.exports = router;
