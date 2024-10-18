const {budgetsCollection} = require("../models/budgetModel");
const createBudget = async (req, res) => {
  try {
    const { name, amount, totalBudget } = req.body;
    console.log(`Creating budget with name: ${name}, amount: ${amount}`);
    const newBudget = { name, amount: parseFloat(amount), totalBudget: parseFloat(totalBudget) };
    const result = await budgetsCollection().insertOne(newBudget);
    console.log("Insert result:", result);
    res.status(201).json(newBudget);
  } catch (error) {
    console.error("Error creating budget:", error);
    res.status(500).json({ message: "Failed to create budget", error });
  }
};


const getBudgets = async (req, res) => {
  try {
    const budgets = await budgetsCollection().find().toArray();
    res.status(200).json(budgets);
  } catch (error) {
    res.status(500).json({ message: "Failed to get budgets", error });
  }
};

module.exports = {
  createBudget,
  getBudgets,
};
