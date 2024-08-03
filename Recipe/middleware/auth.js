const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.redirect('/login');

    jwt.verify(token, 'secret_key', (err, user) => {
        if (err) return res.redirect('/login');
        req.user = user;
        next();
    });
};

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).send('Access denied');
        }
        next();
    };
};

module.exports = { authenticateToken, authorizeRoles };
