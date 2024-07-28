const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    Mobile: {
        type: Number,
        required: true
    },
    City: {
        type: String,
        required: true
    },
    Image: {
        type: String,
        required: true
    }
})

const UserDB = mongoose.model('UserTable', UserSchema);
module.exports = UserDB;