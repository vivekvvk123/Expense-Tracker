const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenseController");

// Route to get all expenses
// expenseController.
router.get("/", expenseController.getAllExpenses);

// Route to add a new expense
router.post("/add", expenseController.createExpense);

// Route to delete an expense by ID
router.delete("/:id", expenseController.deleteExpense);

module.exports = router;
