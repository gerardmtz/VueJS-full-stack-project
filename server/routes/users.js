const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');

// User registration route
router.post('/register', (req, res) => {
    const { username, password, role } = req.body;
    const newUser = new User({ username, password, role });

    newUser.save((err) => {
        if (err) return res.status(500).send('Error registering new user.');
        res.status(200).send('User registered.');
    });
});

// User authentication route
router.post('/login', passport.authenticate('local'), (req, res) => {
    res.status(200).send('Logged in.');
});

module.exports = router;
