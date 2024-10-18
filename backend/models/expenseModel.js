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


const deleteExpense = async (id) => {
  const collection = expensesCollection();
  return collection.deleteOne({ _id: ObjectId(id) });
};

module.exports = {
  createExpense,
  getExpenses,
  deleteExpense
};
