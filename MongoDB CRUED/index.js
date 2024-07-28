const express = require('express');
const db = require('./config/DataBase');
const UserDB = require('./models/UserTable');
const fs = require('fs')
const path = require('path');
const multer = require('multer');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    UserDB.find({}).then((data) => {
        console.log(data);
        return res.render('index', {
            data
        });
    }).catch((err) => {
        console.log(err);
        return false;
    });
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storage
});

app.get('/DeleteData', (req, res) => {
    let id = req.query.id;
    console.log(id);

    UserDB.findById(id).then((user) => {
        if (user && user.Image) {
            fs.unlink(user.Image, (err) => {
                if (err) {
                    console.log('Failed to delete image:', err);
                } else {
                    console.log('Image deleted');
                }
            });
        }

        return UserDB.findByIdAndDelete(id);
    }).then(() => {
        return res.redirect("/");
    }).catch((err) => {
        console.log(err);
    });
});

app.get('/insertData', (req, res) => {
    let id = req.query.id;
    UserDB.findById(id).then((data) => {
        return res.render('index', {
            data
        });
    }).catch((err) => {
        console.log(err);
        return false;
    });
});
app.post('/insertData', upload.single('image'), (req, res) => {
    const { Name, Email, Password, Mobile, City } = req.body;
    let id = req.body.id;

    if (id) {
        UserDB.findById(id).then((user) => {
            let updateData = {
                Name: Name,
                Email: Email,
                Password: Password,
                Mobile: Mobile,
                City: City,
            };

            if (req.file) {
                if (user.Image) {
                    fs.unlink(user.Image, (err) => {
                        if (err) {
                            console.log('Failed to delete old image:', err);
                        } else {
                            console.log('Old image deleted');
                        }
                    });
                }
                updateData.Image = req.file.path;
            }

            return UserDB.findByIdAndUpdate(id, updateData);
        }).then(() => {
            console.log("Data Successfully Updated");
            return res.redirect('/');
        }).catch((err) => {
            console.log(err);
            return false;
        });
    } else {
        let Image = "";

        if (req.file) {
            Image = req.file.path;
        }

        UserDB.create({
            Name: Name,
            Email: Email,
            Password: Password,
            Mobile: Mobile,
            City: City,
            Image: Image

        }).then(() => {
            console.log("Data Successfully Inserted");
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