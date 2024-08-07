const mongoose = require('mongoose');

const AuthSchema = new mongoose.Schema({
    name:String,
    email: String,
    password: String,
    profilePhoto:String,
});

const DataAuth = mongoose.model("userData", AuthSchema);

module.exports = DataAuth;