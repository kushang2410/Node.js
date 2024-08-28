const express = require('express');
const passport = require('passport');

module.exports = (upload) => {
  const { Router } = require('express');
  const { home, signup, indexPage, buttonPage, formPage, login, loginPage, signupPage, logout, alertPage, cardPage, typographyPage, iconPage, ChangePassword, ChangePasswordPage, resetPassword, VerifyOTP, resetPasswordPage, forgotPage } = require('../controllers/user.controller');
  const { UserAuth, isAuth } = require('../middleware/user.auth');
  const router = express.Router();

  router.get('/', isAuth, indexPage);
  router.get('/ui-buttons', isAuth, buttonPage);
  router.get('/ui-forms', isAuth, formPage);
  router.get('/ui-alerts', isAuth, alertPage);
  router.get('/ui-card', isAuth, cardPage);
  router.get('/ui-typography', isAuth, typographyPage);
  router.get('/icon-tabler', isAuth, iconPage);
  router.get('/data', isAuth, home);

  router.post('/signup', upload.single('profilePhoto'), signup);
  router.get('/signup', signupPage);

  router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));
  router.get('/login', loginPage);
  router.get('/logout', logout);
  router.get('/ChangePassword', isAuth, ChangePassword);
  router.post('/ChangePassword', isAuth, ChangePasswordPage);

  router.get('/forgotPassword', forgotPage);
  router.post('/forgot', resetPassword);
  router.post('/verify', VerifyOTP);
  router.post('/resetPassword', resetPasswordPage);

  return router;
}
