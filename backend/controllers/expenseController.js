const { createExpense, getExpenses, deleteExpense } = require('../models/expenseModel');
const { ObjectId } = require('mongodb');
const { getDB } = require('../config/db');


exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await getExpenses();
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch expenses", error });
  }
};

exports.createExpense = async (req, res) => {
  try {
    const { amount, category, description, date } = req.body;
    const newExpenseId = await createExpense({ amount, category, description, date });
    res.status(201).json({ id: newExpenseId });
  } catch (error) {
    res.status(500).json({ message: "Failed to create expense", error });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log("hello")
    const collection = getDB().collection('expenses');
    // console.log(collection)
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    console.log(result)

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Failed to delete expense", error });
  }
};
