const mongoose = require('mongoose');

const db = async () => {
    await mongoose.connect("Enter The DataBase Link")
    console.log("database connected");
}

module.exports = db
