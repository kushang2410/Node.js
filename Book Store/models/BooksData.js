const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    ImageURL:{
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Price: {
        type: Number,
        required: true
    },
    Discount: {
        type: Number,
        required: true
    }
})

const BooksDB = mongoose.model('BooksTbale', BookSchema);
module.exports = BooksDB;