const { connectDB } = require('./config/db');
const budgetRoutes = require('./routes/budgetRoutes');
const express = require('express');
const app = express();
const port = 3000;

require('dotenv').config();
// console.log(process.env.MONGO_URI);


connectDB();

app.use(express.json());
app.use('/api', budgetRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
    });

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    });

