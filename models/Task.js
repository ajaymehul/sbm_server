var mongoose = require('mongoose')
  , Schema = mongoose.Schema

var taskSchema = Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  subTasks: [
     {
      st_desc: {
        type: String,
        required: true
      }, 
      completed: {
        type: Boolean,
        required: true
      }
    }
  ],
  role: String,
  shift: String,
  status: {
    type: String,
    required: true
  },
  assigned: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Task', taskSchema);