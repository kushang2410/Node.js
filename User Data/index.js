const express = require('express');
const PORT = 3000;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs")

let UserData = [{
    UserId: 1,
    Name: "Kushang",
    Email: "kushangtanawala@gmail.com",
    Password: "1234",
    Mobile: 9023918382
}]

app.get('/', (req, res) => {
    return res.render('index', {
        User: UserData
    });
})

app.post('/insertData', (req, res) => {
    let obj = {
        UserId: req.body.UserId,
        Name: req.body.Name,
        Email: req.body.Email,
        Password: req.body.Password,
        Mobile: req.body.Mobile
    }

    UserData.push(obj);
    return res.redirect('back');
})

app.listen(PORT, (err) => {
    if (err) {
        console.log("Server Nit Started");
        return false;
    }
    console.log("Server Started");
})