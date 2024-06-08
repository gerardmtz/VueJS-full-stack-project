module.exports.isAdmin = function(req, res, next) {
    console.log('User', req.user);
    if (req.isAuthenticated() && req.user.role === 'admin') {
        return next();
    } else {
        res.status(403).send('Forbidden');
    }
};
