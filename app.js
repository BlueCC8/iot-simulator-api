const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const path = require('path');
const session = require('express-session');
const flash = require('express-flash-messages');
const passport = require('passport');
const routes = require('./routes/routes');
//! Note Since version 1.5.0, the cookie-parser middleware no longer needs to be used for this module to work. This module now directly reads and writes cookies on req/res.
//! Using cookie-parser may result in issues if the secret is not the same between this module and cookie-parser.

mongoose.Promise = global.Promise;
// node env environment variable if not in test
// test is separated in test/test_helper
if (process.env.NODE_ENV !== 'test') {
  // * Connects to the remote databse
  mongoose
    .connect(
      'mongodb+srv://airfor:qO4ZjiFpE63i464z@iot-simulator-og9ll.mongodb.net/api_iot?retryWrites=true',
      {
        useNewUrlParser: true
      }
    )
    .then(() => {
      console.log('Remote connection successful');
    })
    .catch(err => {
      console.error(err);
      // * Connects to localhost database
      mongoose
        .connect('mongodb://localhost:27017/iot-simulator', {
          useNewUrlParser: true
        })
        .then(() => {
          console.log('Local connection successful');
        })
        .catch(() => console.error(err));
    });
}
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SEC || 'You must generate a random session secret'
  })
);
app.use(flash());
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use('/images', express.static(path.join('images')));
// * Passport
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport/passport')(passport);

//* Enhance app to allow requests coming from other applications (React/Angular), not only direct callers like Postman
// * Login Handler
app.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
    successFlash: 'Welcome!'
  })
);
// app.use((err, req, res) => {
//   res.status(422).send({
//     err: err.message
//   });
// });
routes(app);

module.exports = app;
