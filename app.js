const express = require('express');
const config = require('./config');
const postRoutes = require('./routes/postRoutes');
const getRoutes = require('./routes/getRoutes');

const app = express();
app.use(express.json());
app.use('/', postRoutes);
app.use('/', getRoutes);

// Start the server
app.listen(config.port, function() {
  console.log('listening on 3002')
})

module.exports = app;

