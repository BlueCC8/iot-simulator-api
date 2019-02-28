var LocalStrategy = require('passport-local').Strategy;

var User = require("../../models/User");

module.exports = function (passport) {

    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function (userId, done) {
        User.findById(userId, (err, user) => {
            done(err, user)
        });
    });

    const local = new LocalStrategy((username, password, done) => {
        console.log("Call local strategy")
        User.findOne({
                username
            })
            .then(user => {
                if (!user || !user.validPassword(password)) {
                    console.log("invalid username")
                    done(null, false, {
                        message: "Invalid username/password"
                    });
                } else {
                    console.log("done user")
                    done(null, user);
                }
            })
            .catch(e => {
                console.log("error catch")
                console.error(e)
                done(e)
            });
    });
    passport.use("local", local);

}