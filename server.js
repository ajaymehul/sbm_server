const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const config = require('./config');
const  ObjectId = require('mongodb').ObjectID;

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


  // This method updates the task by replacing the whole task document in the collection. 
  // Example : "http://localhost:3002/updateTask"
  // Request  body example :
  // {
  //   "_id": "5fb01e2872d8db3e0d2befb4",
  //   "title": "Test UpdatedONe",
  //   "description": "This is a test whether it worked or not hahahahahha",
  //   "subTasks": [
  //     {
  //       "st_desc": "Replace the toilet papers",
  //       "completed": false
  //     },
  //     {
  //       "st_desc": "Refill handwashing soap",
  //       "completed": true
  //     }
  //   ],
  //   "role": "Janitor",
  //   "shift": "8:00-17:00",
  //   "status": "incomplete",
  //   "assigned": "open"
  // }
  app.post('/updateTask', (req, res) => {
    console.log(req.body);
    const updatedTask = req.body
    const TaskId = req.body['_id']
    console.log(`Task id : ${TaskId}`)
    delete updatedTask['_id']
    console.log (updatedTask)
    const collection = client.db("employees").collection("tasks");
    collection.replaceOne({"_id": ObjectId(`${TaskId}`)}, updatedTask)
    res.json("Updating the task")
  })



  

  app.post('/addTask', (req, res) => {
    console.log("got req");
    const collection = client.db("employees").collection("tasks");
    console.log("got req");
    collection.insert(req.body)
    .catch(error => console.error(error));

  });

});

