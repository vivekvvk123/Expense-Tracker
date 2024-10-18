const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const config = require("./config");
const User = require("./models/user.model");

const PORT = process.env.PORT || 5000;

const mongo_uri = process.env.MONGO_URI;
mongoose
    .connect(mongo_uri)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

const app = express();
app.use(cors());
app.use(express.json());

const jwt = require("jsonwebtoken");

const { authenticateToken } = require("./utilities");

app.get("/", (req, res) => {
    res.json({ data: "Hello World!" });
});

// Create Account
app.post("/create-account", async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res
            .status(400)
            .json({ error: true, message: "Please fill all fields" });
    }

    const isUser = await User.findOne({ email: email });

    if (isUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({ username, email, password });

    await user.save();

    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1d",
    });

    return res.json({
        message: "User created successfully",
        user,
        accessToken,
        error: false,
    });
});

// Login

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res
            .status(400)
            .json({ error: true, message: "Please fill all fields" });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    if (user.password !== password) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1d",
    });

    return res.json({
        message: "User logged in successfully",
        user,
        accessToken,
        error: false,
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
