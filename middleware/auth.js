/* Middleware file to be used authentication routes */
// Middleware for rol check

module.exports.isAdmin = function(req, res, next) {
    if (req.isAuthenticated() && req.user.role === 'admin') {
        return next();
    } else {
        res.status(403).send('Forbidden');
    }
};
