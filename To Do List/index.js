const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.urlencoded());
app.set("view engine", "ejs");

let ToDoList = [{
        id: 1,
        task: "Task 1"
    }
];

app.get('/', (req, res) => {
    res.render('index', {
        ToDoList
    });
});

app.post('/addTask', (req, res) => {
    const newTask = {
        task: req.body.task
    };
    ToDoList.push(newTask);
    res.redirect('/');
});

app.post('/editTask', (req, res) => {
    const taskId = req.body.taskId;
    const updatedTask = req.body.task;
    const taskIndex = ToDoList.findIndex(task => task.id == taskId);
    if (taskIndex !== -1) {
        ToDoList[taskIndex].task = updatedTask;
    }
    res.redirect('/');
});

app.post('/deleteTask', (req, res) => {
    const taskId = req.body.taskId;
    ToDoList = ToDoList.filter(task => task.id != taskId);
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});