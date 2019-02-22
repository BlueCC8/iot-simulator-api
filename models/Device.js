var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var validate = require("mongoose-validator");

var currencyValidator = [
    validate({
        validator: 'isCurrency',
        message: 'Invalid currency',
    }),
];
    var urlValidator = [
    validate({
        validator: 'isURL',
        message: 'Invalid URL',
    }),
];
var DeviceSchema = new Schema({
    devName: {
        type: String,
        trim: true,
        required: [true, "Why no name?"],
        minlength: [3, "Too few characters"]
    },
    appLayerID: {
        type: Schema.Types.ObjectId,
        ref: "ApplicationLayer"
    },
    tranLayer: {
        type: String,
        trim: true,
        enum: ["TCP", "UDP"]
    },
    netLayerID: {
        type: Schema.Types.ObjectId,
        ref: "NetworkLayer"
    },
    linLayerID: {
        type: Schema.Types.ObjectId,
        ref: "LinkLayer"
    },
    devPrice: {
        type: String,
        trim: true,
        min: 0,
        validate: currencyValidator
    },
    devImgUrl: {
        type: String,
        trim: true,
        validate: urlValidator
    },
    updated_date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("Device", DeviceSchema);