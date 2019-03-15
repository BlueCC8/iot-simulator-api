const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../../models/User');
// Authentication Middleware
const authMiddleWare = (req, res, next) =>
  // console.log(req);
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    // console.log(req.headers);
    // console.log(err);
    // console.log(user);
    if (info) {
      next(info);
    }
    req.username = user.username;
    next();
  })(req, res, next);
const loggedInOnly = (req, res, next) => {
  if (req.isAuthenticated() && req) {
    console.log('isAthenticated');
    next();
  } else
    res.json({
      authenticated: false
    });
};
// const verifyToken = (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(' ')[1];
//     jwt.verify(token, 'hello_darkness');
//     next();
//   } catch (error) {
//     res.status(401).json({ message: 'Auth failed!' });
//   }
// };
const loggedOutOnly = (req, res, next) => {
  if (req.isUnauthenticated()) {
    console.log('notAthenticated');
    next();
  } else
    res.json({
      authenticated: true
    });
};

module.exports = {
  loggedInOnly,
  loggedOutOnly,
  authMiddleWare,
  register(req, res, next) {
    const { username, email, password } = req.body;
    User.create({
      username,
      email,
      password
    })
      .then(user => {
        req.login(user, { session: false }, err => {
          if (err) next(err);
          else
            res.status(201).json({
              message: 'Success register',
              authenticated: true
            });
        });
      })
      .catch(err => {
        // console.log(err);
        if (err.name === 'ValidationError') {
          res.status(409).json({
            message: err,
            authenticated: false
          });
        } else next(err);
      });
  },
  logout(req, res, next) {
    req.logout();
    res.status(200).json({
      message: 'Success logout',
      authenticated: false
    });
    next();
  },
  authenticatePassport(req, res, next) {
    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err) {
        next(err);
      }
      if (!user) {
        res.status(401).json({
          message: info,
          authenticated: false
        });
      } else {
        req.login(user, { session: false }, error => {
          if (error) {
            res.status(401).json(error);
          }
          const { username, password } = user;
          const token = jwt.sign({ username, password }, process.env.JWT_KEY, { expiresIn: '1h' });

          return res.json({ user, token, expiresIn: 3600 });
        });
      }
    })(req, res, next);
  }
};
