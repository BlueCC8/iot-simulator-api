const mongoose = require('mongoose');

const { Schema } = mongoose;

const EthernetSchema = new Schema({
  etherName: {
    type: String,
    trim: true,
    required: [true, 'Why no name?'],
    minlength: [3, 'Too few characters']
  },
  etherStandard: {
    type: String,
    trim: true
  },
  etherDataRate: {
    type: String,
    trim: true
  },
  imagePath: {
    type: String
  },
  updated_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Ethernet', EthernetSchema);
