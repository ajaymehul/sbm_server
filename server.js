const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const config = require('./config');

// Start the server
app.listen(3002, function() {
  console.log('listening on 3002')
})
app.use(express.json())

//add database authentication here.
const uri = "mongodb+srv://ajay:pass495@cluster0.02djz.mongodb.net/employees?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  
  // perform actions on the collection object
  console.log("connected");
  
  
  app.post('/login', (req, res) => {
    const collection = client.db("employees").collection("user");
    console.log("got req");
    collection.find({username: {$eq : req.body.username}, password: {$eq: req.body.password}}).toArray()
      .then(results => {
       if(results.length >0){
         res.json(results[0]);
       }
      })
      .catch(error => console.error(error));

  });

  // Get all the tasks for a  specific username. 
  // Note : This also pulls all the tasks that are not assigned to anyone.
  // Example : "http://localhost:3002/tasks/ajay"
  app.get('/tasks/:username', (req, res) => {
    var employee_username = req.params.username
    console.log(`Gettting tasks for ${employee_username}`);
    const collection = client.db("employees").collection("tasks");
    collection.find({"assigned":{"$in":[`${employee_username}`,"open"]}}).toArray().then(results => {
      if(results.length > 0){
        res.json(results);
      }
    })
    .catch(error => console.error(error));
  });

  app.post('/addTask', (req, res) => {
    console.log("got req");
    const collection = client.db("employees").collection("tasks");
    console.log("got req");
    collection.insert(req.body)
    .catch(error => console.error(error));

  });

});

