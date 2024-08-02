const mongoose = require('mongoose');

const db = async () => {
    await mongoose.connect("mongodb+srv://kushangtanawala:12345@cluster0.uhmgxxp.mongodb.net/User")
    console.log("database connected");
}

module.exports = db