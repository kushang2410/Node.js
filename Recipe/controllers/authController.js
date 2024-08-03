const User = require('../models/user.schema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const home = (req, res) => {
    const user = req.user || null;
    res.render('index', { user });
};


const renderRegisterForm = (req, res) => {
    const user = req.user || null;
    res.render('register', { user });
};

const renderLoginForm = (req, res) => {
    const user = req.user || null;
    res.render('login', { user });
};


const register = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = new User({ username, password });
        await user.save();
        res.redirect('/login');
    } catch (err) {
        res.status(500).send('Error registering new user');
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            console.log('User not found');
            return res.status(400).send('Invalid credentials');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Password does not match');
            return res.status(400).send('Invalid credentials');
        }
        const token = jwt.sign({ id: user._id, role: user.role }, 'secret_key');
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/');
    } catch (err) {
        console.error('Error logging in', err);
        res.status(500).send('Error logging in');
    }
};


const logout = (req, res) => {
    res.clearCookie('token');
    res.redirect('/login');
};

module.exports = { renderRegisterForm, renderLoginForm, register, login, logout, home };
