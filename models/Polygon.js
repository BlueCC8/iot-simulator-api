const mongoose = require('mongoose');

const { Schema } = mongoose;
const DotSchema = require('./Dot');

const PolygonSchema = new Schema({
  polName: {
    type: String,
    trim: true,
    required: [true, 'Why no name?'],
    minlength: [3, 'Too few characters']
  },
  polDots: [
    {
      type: DotSchema,
      trim: true
    }
  ],
  updated_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Polygon', PolygonSchema);
