const { getDB } = require('../config/db');

const budgetsCollection = () => getDB().collection('budgets');

module.exports = { budgetsCollection};
