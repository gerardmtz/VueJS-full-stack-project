const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/user');
const { registerUser, userLogin, userLogout } = require('../controllers/users');

// User registration route
router.post('/register', registerUser);


// Login route
router.post('/login', userLogin);

// Logout route
router.get('/logout', userLogout);

module.exports = router;
