const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/BookStore')
const db = mongoose.connection

db.on('connected', (err) => {
    if (err) {
        console.log('DataBase Not Connected');
        return false;
    }
    console.log('DataBase Connected')
})