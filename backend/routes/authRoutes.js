// routes/authRoutes.js
const express = require('express');
const { signup, login } = require('../controller/authController');
const router = express.Router();

router.get('/signup', (req, res) => {
    res.json({ message: "SIGNUP PAGE" });
});

router.post('/signup', signup);

router.get('/login', (req, res) => {
    res.json({ message: "LOGIN PAGE" });
});

router.post('/login', login);

module.exports = router;
