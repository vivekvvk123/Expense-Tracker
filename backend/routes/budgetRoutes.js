const express = require('express');
const {
  createBudget,
  addExpense,
  getBudgets,
  getExpenses,
  deleteExpense,
} = require('../controllers/budgetController');

const router = express.Router();


router.post('/budget', createBudget);
// router.post('/expense', addExpense);
router.get('/budgets', getBudgets);
// router.get('/expenses', getExpenses);
// router.delete('/expense/:id', deleteExpense);

module.exports = router;
