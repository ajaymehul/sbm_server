const express = require('express');
const Task = require('../models/Task');
const User = require('../models/User');
const Shift = require('../models/Shift');
const router = express.Router();

router.get('/tasks/:username', (req, res) => {
    var employee_username = req.params.username
    const filter = {assigned: {$in: [employee_username, 'open']}};
    Task.find(filter).then(data => {
       res.json(data);
    })
    .catch(err => {console.log(err);});
});

router.get('/tasks', (req, res) => {
    Task.find().then(data => {
       res.json(data);
    })
    .catch(err => {console.log(err);});
});

router.get('/users', (req, res) => {
    const filter = {type: "employee"};
    User.find(filter).then(data => {
       res.json(data);
    })
    .catch(err => {console.log(err);});
});

router.get('/shifts', (req, res) => {
    Shift.find().then(data => {
       res.json(data);
    })
    .catch(err => {console.log(err);});
});

module.exports = router;