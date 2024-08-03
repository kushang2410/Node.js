const jwt = require('jsonwebtoken');
const User = require('../models/user.schema');

const attachUser = async (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        try {
            const decoded = jwt.verify(token, 'secret_key');
            const user = await User.findById(decoded.id);
            if (user) {
                req.user = user;
            }
        } catch (err) {
            console.error(err);
        }
    }
    next();
};

module.exports = attachUser;
