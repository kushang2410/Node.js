const mongoose = require("mongoose");

const db = async ()=>{
    try {
        await mongoose.connect("mongodb+srv://kushangtanawala:1234@cluster0.i10uonz.mongodb.net/Google-Auth");
        console.log("Database connected...");
    } catch (error) {
        console.log(error);
    }
}

module.exports=db;