var mongoose = require('mongoose')
  , Schema = mongoose.Schema

var userSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  }
},
{ collection: 'user' }
);

module.exports = mongoose.model('User', userSchema);