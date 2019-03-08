const mongoose = require('mongoose');

const { Schema } = mongoose;

const RoomSchema = new Schema({
  roomName: {
    type: String,
    trim: true,
    required: [true, 'Why no name?'],
    minlength: [3, 'Too few characters']
  },
  roomType: {
    type: String,
    trim: true
  },
  roomHeight: {
    type: Number,
    trim: true,
    min: 0
  },
  polID: {
    type: Schema.Types.ObjectId,
    trim: true
  },
  configDevIDs: [
    {
      type: Schema.Types.ObjectId,
      trim: true
    }
  ],
  updated_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Room', RoomSchema);
