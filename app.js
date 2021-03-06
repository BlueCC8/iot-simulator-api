/* eslint-disable no-underscore-dangle */
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const path = require('path');
const session = require('express-session');
const flash = require('express-flash-messages');
const passport = require('passport');
const routes = require('./routes/routes');

mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
// node env environment variable if not in test
// test is separated in test/test_helper
if (process.env.NODE_ENV !== 'test') {
  // * Connects to the remote databse
  mongoose
    .connect(
      `mongodb+srv://AdrianMoore:${
        process.env.MONGO_ATLAS_TEST_PW
      }@iot-simulator-og9ll.mongodb.net/api_iot?retryWrites=true`,
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

routes(app);

module.exports = app;
