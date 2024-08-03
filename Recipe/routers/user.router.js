const express = require('express');
const router = express.Router();
const {home ,renderRegisterForm ,register ,renderLoginForm,login,logout} = require('../controllers/authController');
const {getAllRecipes,getUserRecipes,renderNewRecipeForm,createNewRecipe} = require('../controllers/recipeController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const checkRole = require('../middleware/rolecheck');

router.get('/', home);

router.get('/register', renderRegisterForm);
router.post('/register', register);

router.get('/login', renderLoginForm);
router.post('/login', login);

router.post('/logout', authenticateToken, logout);

router.get('/recipes', authenticateToken, getAllRecipes);
router.get('/my-recipes', authenticateToken, getUserRecipes);
router.get('/recipe/new', authenticateToken, renderNewRecipeForm);
router.post('/recipe', authenticateToken, createNewRecipe);

router.get('/admin', authenticateToken, authorizeRoles('admin'), (req, res) => {
    res.render('admin'); 
});

router.get('/user', authenticateToken, authorizeRoles('user'), (req, res) => {
    res.render('user');
});

module.exports = router;
