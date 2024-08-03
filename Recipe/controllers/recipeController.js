const Recipe = require('../models/recipe.schema');
const User = require('../models/user.schema');

const getAllRecipes = async (req, res) => {
    const user = req.user || null;
    try {
        const recipes = await Recipe.find().populate('createdBy');
        res.render('recipeList', { recipes, user });
    } catch (err) {
        res.status(500).send('Error fetching recipes');
    }
};

const getUserRecipes = async (req, res) => {
    const user = req.user || null;
    try {
        const userWithRecipes = await User.findById(req.user.id).populate('recipes');
        res.render('myRecipes', { recipes: userWithRecipes.recipes, user });
    } catch (err) {
        res.status(500).send('Error fetching user recipes');
    }
};

const renderNewRecipeForm = (req, res) => {
    const user = req.user || null;
    res.render('recipeForm', { user });
};

const createNewRecipe = async (req, res) => {
    try {
        const { title, ingredients, instructions } = req.body;
        const recipe = new Recipe({
            title,
            ingredients: ingredients.split(','),
            instructions,
            createdBy: req.user.id
        });
        await recipe.save();
        const user = await User.findById(req.user.id);
        user.recipes.push(recipe._id);
        await user.save();
        res.redirect('/recipes');
    } catch (err) {
        res.status(500).send('Error creating recipe');
    }
};

module.exports = {
    getAllRecipes,
    getUserRecipes,
    renderNewRecipeForm,
    createNewRecipe
};
