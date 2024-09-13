const express = require('express');
const passport = require('passport');

module.exports = (upload) => {
    const router = express.Router();
    const { home, signup, indexPage, buttonPage, formPage, login, loginPage, signupPage, logout, alertPage, cardPage, typographyPage, iconPage, ChangePassword, ChangePasswordPage, forgotPage, resetPassword, VerifyOTP, resetPasswordPage } = require('../controllers/user.controller');
    const { isAuth } = require('../middleware/user.auth');

    router.get('/', isAuth, indexPage);
    router.get('/ui-buttons', isAuth, buttonPage);
    router.get('/ui-forms', isAuth, formPage);
    router.get('/ui-alerts', isAuth, alertPage);
    router.get('/ui-card', isAuth, cardPage);
    router.get('/ui-typography', isAuth, typographyPage);
    router.get('/icon-tabler', isAuth, iconPage);
    router.get('/data', isAuth, home);
    router.get('/login', loginPage);

    router.post('/signup', upload.single('profilePhoto'), signup);
    router.get('/signup', signupPage);

    router.post('/login', (req, res, next) => {
        console.log('Login request body:', req.body);
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true
        })(req, res, next);
    });
    router.get('/login', (req, res) => {
        res.render('authentication-login', { message: req.flash('error') });
    });

    router.get('/logout', logout);
    router.get('/ChangePassword', isAuth, ChangePassword);
    router.post('/ChangePassword', isAuth, ChangePasswordPage);

    router.get('/forgotPassword', forgotPage);
    router.post('/forgot', resetPassword);
    router.post('/verify', VerifyOTP);
    router.post('/resetPassword', resetPasswordPage);

    router.get('/auth/google',
        passport.authenticate('auth0', {
            scope: 'openid email profile',
            connection: 'google-oauth2',
            prompt: 'login'
        })
    );

    router.get('/callback', passport.authenticate('auth0', {
        failureRedirect: '/login'
    }), (req, res) => {
        res.redirect('/');
    });

    return router;
};
