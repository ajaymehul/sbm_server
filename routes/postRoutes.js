const express = require('express');
const Task = require('../models/Task');
const User = require('../models/User');
const mongoose = require('mongoose');
const router = express.Router();


router.post('/login', (req, res) => {
    const filter = {username: req.body.username};
    User.findOne(filter).then(data => {
        if(data.password === req.body.password) res.json(data);
        else res.sendStatus(404);
    })
    .catch(err => {console.log(err);});
});

router.post('/deleteTask/:taskid', (req, res) => {
    var taskid = req.params.taskid;
    const filter = {_id: taskid};
    Task.findOneAndDelete(filter).then(data => {
        res.json(data);
        }
    )
    .catch(err => {console.log(err);});
});

router.post('/addTask', (req, res) => {
    req.body._id = new mongoose.Types.ObjectId();
    const task = new Task(req.body);
    
    task.save().then(data => {
        res.json(data);
        }
    )
    .catch(err => {
        res.json(err);});


});

router.post('/addUser', (req, res) => {
    req.body._id = new mongoose.Types.ObjectId();
    const user = new User(req.body);
    
    user.save().then(data => {
        res.json(data);
        }
    )
    .catch(err => {
        res.json(err);});


});

router.post('/updateTask', async (req, res) => {
    console.log(req.body._id);
    const filter = {_id: req.body._id};
    const update = {subTasks: req.body.subTasks};
    Task.findOneAndUpdate(filter, update, {
        new: true
    }).then(data => {
        res.json(data);
        }
    )
    .catch(err => {console.log(err);});
});

module.exports = router;