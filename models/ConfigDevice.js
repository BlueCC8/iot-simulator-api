const mongoose = require('mongoose');

const { Schema } = mongoose;

const ConfigDeviceSchema = new Schema({
  configName: {
    type: String,
    trim: true,
    required: [true, 'Why no name?'],
    minlength: [3, 'Too few characters']
  },
  devIDs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Device'
    }
  ],
  username: {
    type: String,
    ref: 'Users'
  },
  updated_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ConfigDevice', ConfigDeviceSchema);
