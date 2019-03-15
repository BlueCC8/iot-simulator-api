/* eslint-disable no-underscore-dangle */
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');

const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;
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
          done(null, user, {
            message: 'Logged In Successfully'
          });
        }
      })
      .catch(e => {
        console.log('error catch');
        console.error(e);
        done(e);
      });
  });

  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_KEY
      },
      (jwtPayload, cb) => {
        // console.log(jwtPayload);
        // find the user in db if needed
        return User.findOne(jwtPayload.id)
          .then(user => {
            console.log(user);
            return cb(null, user);
          })
          .catch(err => {
            return cb(err);
          });
      }
    )
  );
  passport.use('local', local);
};
