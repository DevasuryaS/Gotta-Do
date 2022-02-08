const mongoose = require('mongoose');

//here replace <username> and <password> with appropriate credentials and myDB with your DB name
mongoose.connect('mongodb://localhost:27017/ToDoList', { useNewUrlParser: true }, (err) => {
    if (err) {
        console.error(err);
    }
    else {
        console.log("MongoDB Connection successful")
    }
})

require('./task.model')