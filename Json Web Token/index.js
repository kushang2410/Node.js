const express = require('express');
const db = require('./config/DataBase');
const session = require('express-session');
const passport = require('passport');
const { localAuth } = require('./middleware/user.auth');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

localAuth(passport);
const router = require('./routers/user.router')();

app.use('/api', router);

app.listen(3000, (err) => {
  db();
  if (!err) {
    console.log("Server started");
  }
});

module.exports = app;
