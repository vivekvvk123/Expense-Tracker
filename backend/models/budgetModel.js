const { client } = require('../config/db');
const db = client.db('Expense-Tracker');
const budgets = db.collection('details');

module.exports = budgets;
