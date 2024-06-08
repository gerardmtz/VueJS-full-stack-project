const mongoose = require('mongoose');

const dbURI = 'mongodb://localhost:27017/database';

mongoose.connect(dbURI);

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.log('Error connecting to MongoDB:', err);
});

module.exports = mongoose;