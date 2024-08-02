const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    Name: String,
    Description: String,
    Category:  [String],
    Rating:  [String],
    Image: String 
});

const MovieDB = mongoose.model('MovieList', MovieSchema);
module.exports = MovieDB;
