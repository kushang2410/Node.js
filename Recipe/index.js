const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const db = require('./config/database');
const attachUser = require('./middleware/user');
const createAdminUser = require('./middleware/createAdminUser'); 
const app = express();
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const Recipe = require('./models/recipe.schema'); 

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));

app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));

app.use(flash());

app.use((req, res, next) => {
  res.locals.messages = req.flash();
  next();
});

app.use(passport.initialize());
app.use(passport.session());

app.use(attachUser);

app.use('/', require('./routers/user.router'));

app.get('/recipes', async (req, res) => {
  try {
      const recipes = await Recipe.find({});
      res.render('allrecipes', { recipes, user: req.user });
  } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
  }
});

app.get('/recipe/:id', async (req, res) => {
  try {
      const recipe = await Recipe.findById(req.params.id);
      if (!recipe) {
          return res.status(404).send('Recipe Not Found');
      }
      res.render('recipeitem', { recipe, user: req.user });
  } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
  }
});

app.listen(3000, async (err) => {
    await db();
    if (!err) {
      await createAdminUser(); 
      console.log("Server started");
    }
});
  
module.exports = app;
