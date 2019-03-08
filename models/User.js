const mongoose = require('mongoose');

const { Schema } = mongoose;
const validate = require('mongoose-validator');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');

const emailValidator = [
  validate({
    validator: 'isEmail',
    message: 'Invalid email'
  })
];
// ! Should be made lower-case or it will not work
// const hashValidator = [
//   validate({
//     validator: 'isHash',
//     arguments: 'sha256',
//     message: 'Invalid hash'
//   })
// ];
const UserSchema = new Schema({
  username: {
    type: String,
    trim: true
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
  roomIDs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Room'
    }
  ],
  updated_date: {
    type: Date,
    default: Date.now
  }
});

UserSchema.methods.validPassword = password => {
  return bcrypt.compareSync(password, this.passwordHash);
};

UserSchema.virtual('password').set(value => {
  this.passwordHash = bcrypt.hashSync(value, 12);
});
UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', UserSchema);
