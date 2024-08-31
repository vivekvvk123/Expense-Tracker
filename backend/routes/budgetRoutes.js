const express = require('express');
const { getBudgets, addBudget } = require('../controllers/budgetController');
const router = express.Router();

router.get('/budgets', getBudgets);
router.post('/budgets', addBudget);

module.exports = router;
