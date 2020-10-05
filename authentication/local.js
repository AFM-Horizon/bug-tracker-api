const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const repository = require('../data/authRepository');
const authHelper = require('./authHelper');
// const init = require('./passport');

const options = { passReqToCallback: true, sessions: false };

// init();

passport.use(new LocalStrategy(options, async (req, username, password, done) => {
  repository.GetUser({ username })
    .then(async (user) => {
      if (!user) {
        return done(null, false);
      }
      const result = await authHelper.comparePassword(password, user.password);
      if (!result) {
        req.flash('error', 'Login Failed. Mysterious...');
        return done(null, false);
      }

      return done(null, user);
    })
    .catch((err) => done(err));
}));

module.exports = passport;
