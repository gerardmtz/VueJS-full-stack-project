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
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

// Logout route
router.get('/logout', (req, res) => {
    req.logout(err => {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;
