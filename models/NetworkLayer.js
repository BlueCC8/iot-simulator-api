const mongoose = require('mongoose');

const { Schema } = mongoose;

const NetworkLayerSchema = new Schema({
  nlName: {
    type: String,
    trim: true,
    required: [true, 'Why no name?'],
    minlength: [3, 'Too few characters']
  },
  nlIPv4: Boolean,
  nlIPv6: Boolean,
  //! it's either Zigbee or 6LoWpan protocol activated (should be boolean)
  nlZig_LoWpan: {
    type: String,
    trim: true
    // enum: ['Zigbee', '6LoWpan']
  },
  updated_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('NetworkLayer', NetworkLayerSchema);
