const mongoose = require('mongoose');

const { Schema } = mongoose;
const validate = require('mongoose-validator');

const currencyValidator = [
  validate({
    validator: 'isCurrency',
    message: 'Invalid currency'
  })
];
const urlValidator = [
  validate({
    validator: 'isURL',
    message: 'Invalid URL'
  })
];
const DeviceSchema = new Schema({
  devName: {
    type: String,
    trim: true,
    required: [true, 'Why no name?'],
    minlength: [3, 'Too few characters']
  },
  appLayerID: {
    type: Schema.Types.ObjectId,
    ref: 'ApplicationLayer'
  },
  tranLayer: {
    type: String,
    trim: true
  },
  netLayerID: {
    type: Schema.Types.ObjectId,
    ref: 'NetworkLayer'
  },
  linLayerID: {
    type: Schema.Types.ObjectId,
    ref: 'LinkLayer'
  },
  devPrice: {
    type: String,
    trim: true,
    min: 0,
    validate: currencyValidator
  },
  username: {
    type: String,
    ref: 'Users'
  },
  devProducer: {
    type: String,
    trim: true
  },
  devImgUrl: {
    type: String,
    trim: true
  },
  updated_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Device', DeviceSchema);
