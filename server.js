const config = require('./config');
const mongoose = require('mongoose');
const app = require('./app');



//add database authentication here.

mongoose.connect(config.uri, { useNewUrlParser: true, useUnifiedTopology: true }, ()  => {
  // perform actions on the collection object
  console.log("connected");
});

