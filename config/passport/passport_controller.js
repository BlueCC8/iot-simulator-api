const User = require('../../models/User');
// const { passport } = require('../../app');
// Authentication Middleware

const loggedInOnly = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log('isAthenticated');
    next();
  } else
    res.json({
      authenticated: false
    });
};

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
  // renderIndex(req, res, next) {
  //   console.log('render index');
  //   // res.render("index", {
  //   //   username: req.user.username
  //   // })
  //   res.status(200).send('Index redering...');
  //   next();
  // },
  // renderLogin(req, res, next) {
  //   console.log('try log in');
  //   // res.render("login");
  //   res.status(200).send('Login redering...');
  //   next();
  // },
  // renderRegister(req, res, next) {
  //   console.log('register get');
  //   // res.render("register");
  //   res.status(200).send('Register redering...');
  //   next();
  // },
  register(req, res, next) {
    const { username, email, password } = req.body;
    User.create({
      username,
      email,
      password
    })
      .then(user => {
        req.login(user, err => {
          if (err) next(err);
          else
            res.json({
              message: 'Success register',
              authenticated: true
            });
        });
      })
      .catch(err => {
        if (err.name === 'ValidationError') {
          res.json({
            message: 'Username already exists',
            authenticated: false
          });
        } else next(err);
      });
  },
  logout(req, res, next) {
    req.logout();
    res.json({
      message: 'Success logout',
      authenticated: false
    });
    next();
  }
  // ,
  // authenticatePassport() {
  //   passport.authenticate('local', (req, res) => {
  //     res.json({
  //       message: 'Success authentication',
  //       authenticated: true
  //     });
  //   });
  // }
};
