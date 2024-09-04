const express = require("express");
const { connectDB } = require("./config/db");
const budgetRoutes = require("./routes/budgetRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api", budgetRoutes);
app.use("/api", expenseRoutes);

const PORT = 5000;

app.post("/", function (req, res) {
  var username = req.body.username;
  var htmlData = "Hello:" + username;
  res.send(htmlData);
  console.log(htmlData);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
