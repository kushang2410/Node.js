const express = require('express');
const db = require('./config/DataBase');
const multer = require('multer');
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const router = require('./routers/Movierouter')(upload); 

app.use('/', router);

app.use((err, req, res, next) => {
    console.log(err);
});

app.listen(3000, (err) => {
    db();
    if (!err) {
        console.log("Server started");
    }
});
