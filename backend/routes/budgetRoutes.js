const express = require('express');
const {createBudget,getBudgets,} = require('../controllers/budgetController');

const router = express.Router();


router.post('/budget', createBudget);
router.get('/budgets', getBudgets);
// router.post('/expense', addExpense);
// router.get('/expenses', getExpenses);
// router.delete('/expense/:id', deleteExpense);

module.exports = router;
