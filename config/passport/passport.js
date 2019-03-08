/* eslint-disable no-underscore-dangle */
const LocalStrategy = require('passport-local').Strategy;

const User = require('../../models/User');

module.exports = passport => {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((userId, done) => {
    User.findById(userId, (err, user) => {
      done(err, user);
    });
  });

  const local = new LocalStrategy((username, password, done) => {
    console.log('Call local strategy');
    User.findOne({
      username
    })
      .then(user => {
        if (!user || !user.validPassword(password)) {
          console.log('invalid username');
          done(null, false, {
            message: 'Invalid username/password'
          });
        } else {
          console.log('done user');
          done(null, user);
        }
      })
      .catch(e => {
        console.log('error catch');
        console.error(e);
        done(e);
      });
  });
  passport.use('local', local);
};
