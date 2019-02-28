var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var validate = require("mongoose-validator");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");

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
    passwordHash: {
        type: String,
        trim: true
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

UserSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.passwordHash);
};

UserSchema.virtual("password").set(function (value) {
    this.passwordHash = bcrypt.hashSync(value, 12);
});
UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", UserSchema);