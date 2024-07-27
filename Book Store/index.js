const express = require('express');
const db = require('./config/DataBase')
const BooksDB = require('./models/BooksData');
const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    BooksDB.find({}).then((data) => {
        console.log(data);
        return res.render('index', {
            data
        });
    }).catch((err) => {
        console.log(err);
        return false;
    });
});
app.get('/DeleteData', (req, res) => {
    let id = req.query.id;
    console.log(id);
    BooksDB.findByIdAndDelete(id).then((data) => {
        return res.redirect("/");
    }).catch((err) => {
        console.log(err);
    });
});
app.get('/insertData', (req, res) => {
    let id = req.query.id;
    BooksDB.findById(id).then((data) => {
        return res.render('index', {
            data
        });
    }).catch((err) => {
        console.log(err);
        return false;
    });
});
app.post('/insertData', (req, res) => {
    const { ImageURL, Name, Description, Price, Discount } = req.body;

    let id = req.body.id;
    if (id) {
        BooksDB.findByIdAndUpdate(id, {
            ImageURL : ImageURL,
            Name: Name,
            Description: Description,
            Price: Price,
            Discount: Discount

        }).then(() => {
            console.log("Data Successfully Updated");
            return res.redirect('/');
        }).catch((err) => {
            console.log(err);
            return false;
        });
    } else {
        BooksDB.create({
            ImageURL : ImageURL,
            Name: Name,
            Description: Description,
            Price: Price,
            Discount: Discount,

        }).then((User) => {
            console.log("Data Successfully Insert");
            return res.redirect('/');
        }).catch((err) => {
            console.log(err);
            return false;
        });
    }
});

app.listen(3000, (err) => {
    if (!err) {
        console.log('server started');
    }
});