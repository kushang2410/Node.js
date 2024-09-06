const mongoose = require('mongoose');

const db = async () => {
    await mongoose.connect("Enter DataBase Link")
    console.log("database connected");
}

module.exports = db
