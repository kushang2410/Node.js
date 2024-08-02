const MovieDB = require("../models/UserData");
const fs = require('fs');
const path = require('path');

const home = async (req, res) => {
    try {
        let data = await MovieDB.find();
        console.log(data);
        return res.render('index', { movies: data });
    } catch (err) {
        console.error(err);
    }
}
const AddData = async (req, res) => {
    try {
        const movieData = {
            Name: req.body.Name,
            Description: req.body.Description,
            Category: req.body.Category,
            Rating: req.body.Rating,
            Image: req.file ? `/uploads/${req.file.filename}` : ''
        };
        await MovieDB.create(movieData);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}
const editPage = async (req, res) => {
    const { id } = req.params;
    try {
        const movie = await MovieDB.findById(id);
        res.render('edit', { movie });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}
const update = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await MovieDB.findById(id);

        if (!movie) {
            console.log('Movie not found');
            res.status(404).send('Movie not found');
            return;
        }

        const updatedData = {
            Name: req.body.Name,
            Description: req.body.Description,
            Category: req.body.Category,
            Rating: req.body.Rating,
            Image: req.file ? `/uploads/${req.file.filename}` : movie.Image
        };

        if (req.file && movie.Image) {
            const oldImagePath = path.join(__dirname, '..', movie.Image);
            fs.unlink(oldImagePath, (err) => {
                if (err) {
                    console.error('Error deleting old image:', err);
                } else {
                    console.log('Old image deleted successfully');
                }
            });
        }

        await MovieDB.findByIdAndUpdate(id, updatedData, { new: true });
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}
const deleteData = async (req, res) => {
    let { id } = req.params;
    try {
        const movie = await MovieDB.findById(id);

        if (!movie) {
            console.log('Movie not found');
            res.status(404).send('Movie not found');
            return;
        }

        if (movie.Image) {
            const imagePath = path.join(__dirname, '..', movie.Image);
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error('Error deleting image:', err);
                } else {
                    console.log('Image deleted successfully');
                }
            });
        }

        await MovieDB.findByIdAndDelete(id);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = { home, AddData, update, deleteData, editPage };
