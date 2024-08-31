const budgets = require('../models/budgetModel');

exports.getBudgets = async (req, res) => {
    try {
        const allBudgets = await budgets.find({}).toArray();
        res.json(allBudgets);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};
    
// Add a new budget
exports.addBudget = async (req, res) => {
    try {
        const newBudget = req.body;
        await budgets.insertOne(newBudget);
        res.status(201).json(newBudget);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};
