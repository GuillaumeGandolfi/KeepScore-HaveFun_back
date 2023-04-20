const { User, Shop, Transaction, Family, Collection, Quest } = require("../models");


const transactionController = {
    getAllTransactions: async (req, res) => {
        try {   
            const transactions = await Transaction.findAll();
            res.status(200).json(transactions);
        } catch (error) {
            console.trace(error);
            res.status(500).json(error.toString());
        }
    },
    getOneTransaction: async (req, res) => {
        try {
            const transactionId = req.params.id;
            const transaction = await Transaction.findByPk(transactionId);

            if(transaction) {
                res.status(200).json(transaction);
            } else {
                res.status(404).json('Cant find transaction ' + transactionId);
            }
        } catch (error) {
            console.trace(error);
            res.status(500).json(error.toString());
        }
    },
    createTransaction: async (req, res) => {
        try {
            // console.log(req.body)
            const { label , operation, user_id } = req.body;
            // Je crée un array qui récupère mes erreurs : 
            const bodyErrors = [];

            if (!operation) {
                bodyErrors.push('operation can not be empty');
            }
            if (!user_id){
                bodyErrors.push('user_id can not be empty');
            }

            if (bodyErrors.length) {
                res.status(404).json(bodyErrors);
            } else {
                let newTransaction = Transaction.build({ 
                    operation,
                    label,
                    user_id
                 });

                await newTransaction.save();
                res.status(200).json(newTransaction);
            }
        } catch(error) {
            console.trace(error);
            res.status(500).json(error.toString());
        }
    },
    modifyTransaction: async (req, res) => {
        try {
            const transactionId = req.params.id;
            const transaction = await Transaction.findByPk(transactionId);

            if(!transaction) {
                res.status(404).send('Cant find transaction ' + transactionId);
            } else {
                // On récupère les nouvelles infos dans le body :
                const { operation } = req.body;
                // Et on change que les params présent dans le body :
                if (operation) {
                    transaction.operation = operation;
                }
                 // Puis on enregistre directement en bdd
                await transaction.save();
                // Et on renvoie l'instance enregistré en réponse dans le req
                res.status(200).json(transaction);
            }

        } catch (error) {
            console.trace(error);
            res.status(500).json(error.toString());
        }
    },
    deleteTransaction: async (req, res) => {
        try {
            // Je récupère la transaction que je souhaite supprimer
            const transactionId = req.params.id;
            const transaction = await Transaction.findByPk(transactionId);

            // Ensuite je la supprime puis le fait savoir dans la requête
            await transaction.destroy();
            res.status(200).json('Transaction deleted')

        } catch (error) {
            console.trace(error);
            res.status(500).json(error.toString());
        }
    }
};

module.exports = transactionController;