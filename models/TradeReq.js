var mongoose = require('mongoose')
  , Schema = mongoose.Schema

var shiftSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  uid: mongoose.Schema.Types.ObjectId,
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  assignedTo: {
    type: String,
    required: true
  },
  oid: mongoose.Schema.Types.ObjectId,
  startTime2: {
    type: String,
    required: true
  },
  endTime2: {
    type: String,
    required: true
  },
  assignedTo2: {
    type: String,
    required: true
  }
},
{ collection: 'trades' }
);

module.exports = mongoose.model('TradeReq', shiftSchema);