var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var ConfigDeviceSchema = new Schema({
    configName: {
        type: String,
        trim: true,
        required: [true, "Why no name?"],
        minlength: [3, "Too few characters"]
    },
    devIDs: [{
        type: Schema.Types.ObjectId,
        ref: "Device"
    }],
    updated_date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("ConfigDevice", ConfigDeviceSchema);