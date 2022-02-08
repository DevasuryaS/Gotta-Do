const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Task = mongoose.model('Task')

router.get('/', (req, res) => {
    res.render('./task/addTask', { viewTitle: "Add task" })
})

//to display all tasks
router.get('/list', (req, res) => {
    Task.find((err, docs) => {
        if (!err) {
            res.render("task/list", {
                list: docs.map(doc => doc.toJSON()),
            })
        }
        else {
            console.log("Error in retrieving data")
        }
    })
})

//add a task
router.post('/', (req, res) => {
    addTask(req, res)
})
//function to add task
function addTask(req, res) {
    var task = new Task();
    task.taskName = req.body.taskName;
    task.taskDescription = req.body.taskDescription;
    task.save((err, doc) => {
        if (!err) {
            res.redirect('task/list')
        }
        else {
            console.log("Error during insertion")
        }
    })
}



//delete a task
router.get('/delete/:id', (req, res) => {
    Task.findByIdAndDelete(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/task/list')
        }
        else {
            console.log("Error")
        }
    })
})

//edit task
router.get('/edit/:id', (req, res) => {
    let id = req.params.id
    Task.findById(id, (err, doc) => {
        if (!err) {
            res.render('./task/edit', {
                viewTitle: "Update this task",
                task: doc.toJSON()
            })
        }
        else {
            console.log("Error while getting information!")
        }
    })

})

router.post('/edit/:id', (req, res) => {
    let updatedTask = {
        taskName: req.body.taskEditName,
        taskDescription: req.body.taskEditDescription,
    };
    Task.findByIdAndUpdate(req.params.id, updatedTask, (err, doc) => {
        if (!err) {
            res.redirect('/task/list')
        }
        else {
            console.log("Error while updating!")
        }
    })
})




module.exports = router;