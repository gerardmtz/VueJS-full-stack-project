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


// Login route
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) { return next(err); }
        if (!user) { return res.status(401).json({ message: info.message }); }

        req.logIn(user, (err) => {
            if (err) { return next(err); }
            return res.json({ message: 'Login successful', user });
        });
    })(req, res, next);
});

// Logout route
router.get('/logout', (req, res) => {
    req.logout(err => {
        if (err) { return next(err); }
        res.json({ message: 'Logout successful' });
    });
});

module.exports = router;
