const express = require('express');
const db = require('./config/DataBase');
const session = require('express-session');
const passport = require('passport');
const { localAuth } = require('./middleware/user.auth');
const multer = require('multer');
const path = require('path');
const app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null,file.originalname);
  }
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const upload = multer({ storage: storage });
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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
const router = require('./routers/user.router')(upload);
app.use('/', router);

app.listen(3000, (err) => {
  db();
  if (!err) {
    console.log("server started");
  }
});

module.exports = { upload };
