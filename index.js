const express = require('express');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const mongoose = require('./config/database'); // DB Connection
const multer = require('multer'); // Upload files module
const path = require('path');

const app = express();

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Express Session
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// Base routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/upload', require('./routes/upload'));
app.use('/admin', require('./routes/admin'));
app.use('/products', require('./routes/product'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});