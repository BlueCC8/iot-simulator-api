const mongoose = require('mongoose');

const { Schema } = mongoose;

const ApplicationLayerSchema = new Schema({
  alName: {
    type: String,
    trim: true,
    required: [true, 'Why no name?'],
    minlength: [3, 'Too few characters']
  },
  alHTTP: Boolean,
  alCoAp: Boolean,
  alWebSocket: Boolean,
  alMQTTE: Boolean,
  alDDS: Boolean,
  alAMQP: Boolean,
  updated_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ApplicationLayer', ApplicationLayerSchema);
