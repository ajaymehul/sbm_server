const express = require('express');
const Task = require('../models/Task');
const User = require('../models/User');
const Shift = require('../models/Shift');
const Trade = require('../models/TradeReq');
const mongoose = require('mongoose');
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

router.get('/shifts/:username', (req, res) => {
    var employee_username = req.params.username
    const filter = {assignedTo: {$in: [employee_username]}};
    Shift.find(filter).then(data => {
       res.json(data);
    })
    .catch(err => {console.log(err);});
});

router.get('/shiftsOther/:username', (req, res) => {
    var employee_username = req.params.username
    const filter = {assignedTo: {$nin: [employee_username]}};
    Shift.find(filter).then(data => {
       res.json(data);
    })
    .catch(err => {console.log(err);});
});

router.get('/trades/:username', (req, res) => {
    var employee_username = req.params.username
    const filter = {$or: [{assignedTo: {$in: [employee_username]}},{assignedTo2: {$in: [employee_username]}}]};
    Trade.find(filter).then(data => {
       res.json(data);
    })
    .catch(err => {console.log(err);});
});

router.get('/execTrade/:tradeid', (req, res) => {
    var tradeid = mongoose.Types.ObjectId(req.params.tradeid);
    const filter = {_id: {$in: [tradeid]}};
    Trade.findOne(filter).then(datasuper => {
       Shift.updateOne({_id: {$in: [mongoose.Types.ObjectId(datasuper.oid)]}},
       {$set: {
            assignedTo: datasuper.assignedTo
            }}).then(data => {});
        Shift.updateOne({_id: {$in: [mongoose.Types.ObjectId(datasuper.uid)]}},
       {$set: {
            assignedTo: datasuper.assignedTo2
            }}).then(data => {});
        
        Trade.findOneAndDelete({_id: {$in: [tradeid]}}).then(data => {
            res.json(data);
            }).catch(err => {console.log(err);});
                    
        
    })
    .catch(err => {console.log(err);});
});


module.exports = router;