const config = require('../config');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongod = new MongoMemoryServer();

async function connect() {

    if (process.env.NODE_ENV === 'test') {
      
      const uri = await mongod.getConnectionString();
      const mongooseOpts = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    };

    await mongoose.connect(uri, mongooseOpts);
    } else {
        mongoose.connect(config.uri, { useNewUrlParser: true, useUnifiedTopology: true })
          .then((res, err) => {
            console.log("connected");
       })
    }
  
}

  async function close () {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
}

/**
 * Remove all the data for all db collections.
 */
async function clear () {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany();
    }
}

module.exports = {connect, close, clear};

