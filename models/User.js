var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var validate = require("mongoose-validator");

var emailValidator = [
    validate({
        validator: 'isEmail',
        message: 'Invalid email',
    })
];
// ! Should be made lower-case or it will not work
var hashValidator = [
    validate({
        validator: 'isHash',
        arguments: 'sha256',
        message: 'Invalid hash',
    })
];
var UserSchema = new Schema({
    username: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        validate: emailValidator
    },
    password: {
        type: String,
        trim: true,
        validate: hashValidator
    },
    roomIDs: [{
        type: Schema.Types.ObjectId,
        ref: "Room",
    }],
    updated_date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("User", UserSchema);