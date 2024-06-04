const express = require('express');
const router = express.Router();
const { isAdmin } = require('../middleware/auth');

// Verify is the user is admin
router.get('/admin', isAdmin, (req, res) => {
    res.status(200).send('The user is admin');
});

module.exports = router;
