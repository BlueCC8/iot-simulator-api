const User = require('../../models/User');
const { passport } = require('../../app');
// Authentication Middleware

const loggedInOnly = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log('isAthenticated');
    next();
  } else res.redirect('/login');
};

const loggedOutOnly = (req, res, next) => {
  if (req.isUnauthenticated()) {
    console.log('notAthenticated');
    next();
  } else res.redirect('/');
};

module.exports = {
  loggedInOnly,
  loggedOutOnly,
  renderIndex(req, res, next) {
    console.log('render index');
    // res.render("index", {
    //   username: req.user.username
    // })
    res.status(200).send('Index redering...');
    next();
  },
  renderLogin(req, res, next) {
    console.log('try log in');
    // res.render("login");
    res.status(200).send('Login redering...');
    next();
  },
  renderRegister(req, res, next) {
    console.log('register get');
    // res.render("register");
    res.status(200).send('Register redering...');
    next();
  },
  register(req, res, next) {
    console.log('register post');
    const { username, password } = req.body;
    User.create({
      username,
      password
    })
      .then(user => {
        req.login(user, err => {
          if (err) next(err);
          else res.redirect('/');
        });
      })
      .catch(err => {
        if (err.name === 'ValidationError') {
          req.flash('Sorry, that username is already taken.');
          res.redirect('/register');
        } else next(err);
      });
  },
  logout(req, res, next) {
    console.log('log out');
    req.logout();
    res.redirect('/login');
    next();
  },
  authenticatePassport() {
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true,
      successFlash: 'Welcome!'
    });
  }
};
