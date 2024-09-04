const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

const uri = process.env.MONGO_URI;
const dbName = "Expense-Tracker";

let db;

const connectDB = async () => {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    db = client.db(dbName);
    console.log(`MongoDB connected to database: ${dbName}`);
  } catch (error) {
    console.error('MongoDB connection failed', error);
    process.exit(1);
  }
};

const getDB = () => db;

module.exports = { connectDB, getDB };

