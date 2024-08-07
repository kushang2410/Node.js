const express = require('express');
const passport = require('passport');
const CategoryData = require('../models/Category.schema');
const SubCategoryData = require('../models/SubCategory.schema');
const ExtraCategoryData = require('../models/ExtraCategory.schema');

module.exports = (upload) => {
  const { Router } = require('express');
  const { home, signup, indexPage,login, loginPage, signupPage, logout, ChangePassword, ChangePasswordPage, resetPassword, VerifyOTP, resetPasswordPage, forgotPage } = require('../controllers/user.controller');
  const { UserAuth, isAuth } = require('../middleware/user.auth');
  const router = express.Router();

  router.get('/', isAuth, indexPage);
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

  router.get('/categories', async (req, res) => {
    const categories = await CategoryData.find();
    res.json(categories);
  });
  
  router.get('/subcategories', async (req, res) => {
    const { categoryId } = req.query;
    const subcategories = await SubCategoryData.find({ categoryId });
    res.json(subcategories);
  });
  
  router.get('/extracategories', async (req, res) => {
    const { subcategoryId } = req.query;
    const extraCategories = await ExtraCategoryData.find({ subcategoryId });
    res.json(extraCategories);
  });
  
  

  return router;
}
