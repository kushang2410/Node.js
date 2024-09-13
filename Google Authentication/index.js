const express = require('express');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const db = require('./config/DataBase');
const multer = require('multer');
const path = require('path');

const app = express();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'uploads')); 
    },
    filename: function (req, file, cb) {
        cb(null,file.originalname);
    }
});

const upload = multer({ storage: storage });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

require('./middleware/user.auth');

const router = require('./routers/user.router')(upload);
app.use('/', router);

app.listen(3000, (err) => {
    db();
    if (!err) {
        console.log("Server started");
    }
});
