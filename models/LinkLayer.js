const mongoose = require('mongoose');

const { Schema } = mongoose;

const LinkLayerSchema = new Schema({
  llName: {
    type: String,
    trim: true,
    required: [true, 'Why no name?'],
    minlength: [3, 'Too few characters']
  },
  llPriorityType: {
    type: String,
    trim: true,
    // ! A - medical pump, implants (Vital)
    // !! B - control systems (Normal priority)
    // !!! C - alarms, lights (Low priority)
    enum: ['A', 'B', 'C']
  },
  llRole: {
    type: String,
    trim: true,
    enum: ['sensor', 'sink', 'actuator']
  },
  llBluetooth: {
    type: String,
    trim: true
  },
  llLrWpan: {
    type: String,
    trim: true,
    enum: ['LrWpan', 'Zigbee']
  },
  llLrWpanType: {
    type: String,
    trim: true,
    // ! Full-function devices (FFD)
    // ! Can operate as a common node or as a coordinator in a PAN
    // ! RFD Can only communicate with FFDs
    enum: ['FFD', 'RFD']
  },
  llCelullar: {
    type: String,
    trim: true
  },
  llNFC: Boolean,
  llProducer: {
    type: String,
    trim: true,
    minlength: [3, 'Too few characters']
  },
  llWifiID: {
    type: Schema.Types.ObjectId,
    ref: 'Wifi'
  },
  llEthernetID: {
    type: Schema.Types.ObjectId,
    ref: 'Ethernet'
  },
  updated_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('LinkLayer', LinkLayerSchema);
