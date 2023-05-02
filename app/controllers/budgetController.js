const { Budget, User } = require('../models');
const { associations } = require('../models/User');

const budgetController = {

    getAllBudgets: async (req, res) => {
        try {
            const budgets = await Budget.findAll({
                include: "operations"
            });
            res.status(200).json(budgets);
        } catch (error) {
            console.error(error);
            console.trace(error);
            res.status(500).json(error);
        }
    },

    getAllBudgetsFromOneUser : async (req, res) => {
        try {
            const userId = req.params.userId;
            const budgets = await Budget.findAll({
                attributes: ['id', 'name', 'amount', 'color'],
                where: {
                    user_id: userId
                }
            });
            res.status(200).json(budgets);
        } catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    },

    getOneBudget: async (req, res) => {
        try {
            const budgetId = req.params.id;
            const budget = await Budget.findByPk(budgetId, {
                include: "operations"
            });
            if (budget) {
                res.status(200).json(budget);
            } else {
                res.status(404).json('Budget with the id: ' + budgetId + ' does not exist');
            }
        } catch (error) {
            console.error(error);
            console.trace(error);
            res.status(500).json(error);
        }
    },

    createBudget: async (req, res) => {
        try  {
            const { value, label } = req.body;
            const errors = [];
    
            if (!value) {
                errors.push('value can not be empty');
            }
            if (!label) {
                errors.push('label can not be empty');
            }

            if (errors.length) {
                res.status(400).json(errors);
            } else {
                let newBudget = Budget.build({
                    value,
                    label
                });

                await newBudget.save();
                res.status(200).json(newBudget);
            }
        } catch (error) {
            console.error(error);
            console.trace(error);
            res.status(500).json(error);
        }
    },

    modifyBudget: async (req, res) => {
        try {
            const budgetId = req.params.id;
            const budget = await Budget.findByPk(budgetId);

            if (!budget) {
                res.status(404).json('Budget with the id: ' + questId + ' does not exist');
            } else {
                const { value, label } = req.body;

                if (value) {
                    budget.value = value;
                }
                if (label) {
                    budget.label = label;
                }

                await budget.save();

                res.status(200).json(budget);
            }
        } catch (error) {
            console.error(error);
            console.trace(error);
            res.status(500).json(error);
        }
    },

    deleteBudget: async (req, res) => {
        try {
            const budgetId = req.params.id;
            const budget = await Budget.findByPk(budgetId);
            await budget.destroy();
            res.status(200).json("Budget deleted");
        } catch (error) {
            console.error(error);
            console.trace(error);
            res.status(500).json(error);
        }
    }
};

module.exports = budgetController;