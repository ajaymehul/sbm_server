const config = require('./config');
const app = require('./app');
const mongoose = require('mongoose');
const db = require('./db/index');

db.connect().then(() => {
    app.listen(config.port, () => {
      console.log('Listening on port: ' + config.port);
    });
  });



