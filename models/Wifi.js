var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var WifiSchema = new Schema({
    wifiName: {
        type: String,
        trim: true,
        required: [true, "Why no name?"],
        minlength: [3, "Too few characters"]
    },
    wifiFrequancy: {
        type: String,
        trim: true
    },
    wifiRange: {
        type: String,
        trim: true
    },
    wifiDataRate: {
        type: String,
        trim: true
    },
    updated_date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("Wifi", WifiSchema);