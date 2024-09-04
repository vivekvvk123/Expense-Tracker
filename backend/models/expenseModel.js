const { getDB } = require('../config/db');
const { ObjectId } = require('mongodb');


const expensesCollection = () => getDB().collection('expenses');

const createExpense = async (expenseData) => {
  const collection = expensesCollection();
  const result = await collection.insertOne(expenseData);
  return result.insertedId;
};

const getExpenses = async () => {
  const collection = expensesCollection();
  return collection.find().toArray();
};

const getExpenseById = async (id) => {
  const collection = expensesCollection();
  return collection.findOne({ _id: new ObjectId(id) });
};

const updateExpense = async (id, expenseData) => {
  const collection = expensesCollection();
  return collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: expenseData }
  );
};

const deleteExpense = async (id) => {
  const collection = expensesCollection();
  return collection.deleteOne({ _id: new ObjectId(id) });
};

module.exports = {
  createExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense
};
