const mongoose = require("mongoose");

const db = async () => {
    try {
        await mongoose.connect("Enter Your DataBase Link");
        console.log("Database connected...");
    } catch (error) {
        console.log(error);
    }
}

module.exports = db;
