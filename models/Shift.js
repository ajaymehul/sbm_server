var mongoose = require('mongoose')
  , Schema = mongoose.Schema

var shiftSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  assignedTo: {
    type: String,
    required: true
  }

},
{ collection: 'shifts' }
);

module.exports = mongoose.model('Shift', shiftSchema);