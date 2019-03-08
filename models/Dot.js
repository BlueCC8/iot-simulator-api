const mongoose = require('mongoose');

const { Schema } = mongoose;

const DotSchema = new Schema({
  dotX: {
    type: Number,
    trim: true,
    min: 0
  },
  dotY: {
    type: Number,
    trim: true,
    min: 0
  },
  updated_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = DotSchema;
