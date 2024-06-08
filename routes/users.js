const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/user');

// User registration route
router.post('/register', async (req, res) => {
    const { username, password, role } = req.body;
    const newUser = new User({ username, password, role });

    try {
        await newUser.save();
        res.status(200).send('User registered.');
    } catch (err) {
        res.status(500).send('Error registering new user.');
    }
});

// User authentication route
router.post('/login', (req, res, next) => {
    passport.authenticate('local', async (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(400).send(info.message);

        try {
            req.login(user, { session: false });
            res.status(200).send(user.username);
        } catch (err) {
            return next(err);
        }
    })(req, res, next);
});

module.exports = router;
