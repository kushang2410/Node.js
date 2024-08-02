const express = require('express');

module.exports = (upload) => {
    const router = express.Router();
    const { home, AddData, update, deleteData, editPage } = require('../controllers/Moviecontroller');
    const UserAuth = require('../middleware/MovieAuth');
    const MovieDB = require('../models/UserData');

    router.get('/add', (req, res) => {
        res.render('addMovie');
    });
    router.get('/', home);
    router.post('/AddData', upload.single('Image'), UserAuth, AddData);

    router.get('/edit/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const movie = await MovieDB.findById(id);
            if (!movie) {
                return res.status(404).send('Movie not found');
            }
            res.render('editMovie', { movie });
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    });
    
    router.post('/update/:id', upload.single('Image'), update);
    router.post('/delete/:id', deleteData);

    return router;
};
