const express = require('express');
const db = require('./config/DataBase');
const session = require('express-session');
const passport = require('passport');
const { localAuth } = require('./middleware/user.auth');
const productRouter = require("./routers/product.router");
const CategoryRouter = require('./routers/Category.router');
const SubCategoryRouter = require('./routers/SubCategory.router');
const ExtraCategoryRouter = require('./routers/ExtraCategory.router');
const multer = require('multer');
const path = require('path');
const flash = require('connect-flash');
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
app.use(flash());

app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});

localAuth(passport);
const router = require('./routers/user.router')(upload);

app.use('/product', productRouter);
app.use('/category', CategoryRouter);
app.use('/subcategory', SubCategoryRouter);
app.use('/extra', ExtraCategoryRouter);
app.use('/', router);

app.listen(3000, (err) => {
  db();
  if (!err) {
    console.log("server started");
  }
});

module.exports = { upload };
