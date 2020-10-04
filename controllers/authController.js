const repo = require('../data/authRepository');
const authHelper = require('../authentication/authHelper');
const passport = require('../authentication/local');

function login(userReturn, req, res) {
  req.logIn(userReturn, (err) => {
    if (err) {
      res.send(err);
    } else {
      res.status(200);
      req.flash('success', 'You are logged in, prepare to squash bugs.');
      res.redirect('/');
    }
  });
}

module.exports = {
  register_a_user_get: async (req, res) => {
    res.render('register');
  },

  get_username: async (req, res) => {
    if (!req.user) {
      res.send('Dud');
    } else {
      res.send(req.user.username);
    }
  },

  register_a_user_post: async (req, res, next) => {
    const user = await authHelper.createEncryptedUser(req.body.username, req.body.password);
    repo.InsertUser(user)
      .then(() => {
        passport.authenticate('local', (err, userReturn) => {
          if (userReturn) {
            login(userReturn, req, res);
          } else if (err) {
            res.redirect('/error');
          }
        })(req, res, next);
      })
      .catch(() => {
        res.redirect('/error');
      });
  },

  login_a_user_get: (req, res) => {
    res.render('login', { error: req.flash('error') });
  },

  login_a_user_post: (req, res, next) => {
    passport.authenticate('local', (err, userReturn) => {
      if (err) {
        req.flash('error', 'Login Failed. Mysterious...');
        res.redirect('/auth/login');
      }
      if (!userReturn) {
        req.flash('error', 'Login Failed. User not found');
        res.redirect('/auth/login');
      }
      if (userReturn) {
        login(userReturn, req, res);
      }
    })(req, res, next);
  },

  logout_a_user: (req, res) => {
    req.logout();
    res.redirect('/');
  },

  get_user: (req, res) => {
    res.send(req.user._id);
  }
};
