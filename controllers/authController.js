const repo = require('../data/authRepository');
const authHelper = require('../authentication/authHelper');
const passport = require('../authentication/local');

// TO BE REPLACED WITH JWT RESPONSE
// function login(userReturn, req, res) {
//   req.logIn(userReturn, (err) => {
//     if (err) {
//       res.send(err);
//     } else {
//       res.status(200);
//       req.flash('success', 'You are logged in, prepare to squash bugs.');
//       res.redirect('/');
//     }
//   });
// }

module.exports = {
  // NOT REQUIRED
  // get_user: (req, res) => {
  //   res.send(req.user._id);
  // }

  // NO LONGER REQUIRED - FRONT END WILL SERVE THIS PAGE
  // register_a_user_get: async (req, res) => {
  //   res.render('register');
  // },

  // NOT REQUIRED - FRONT END WILL BE RESPONSIBLE FOR MANAGING THIS
  // get_username: async (req, res) => {
  //   if (!req.user) {
  //     res.send('Dud');
  //   } else {
  //     res.send(req.user.username);
  //   }
  // },

  // NOT REQUIRED SERVES PAGE - FRONT END WILL DEAL WITH THIS
  // login_a_user_get: (req, res) => {
  //   res.render('login', { error: req.flash('error') });
  // },

  register_a_user_post: async (req, res, next) => {
    const user = await authHelper.createEncryptedUser(req.body.username, req.body.password);
    repo.InsertUser(user)
      .then(() => {
        passport.authenticate('local', (err, userReturn) => {
          if (userReturn) {
            res.status(201);
            res.json({
              message: 'Registration Succesful',
              user: userReturn
            });
          } else if (err) {
            res.status(500).send({ error: err });
          }
        })(req, res, next);
      })
      .catch((err) => {
        res.status(500).send({ error: err });
      });
  },

  // WILL BE REPLACED WITH JWT LOGIN ENDPOINT
  // login_a_user_post: (req, res, next) => {
  //   passport.authenticate('local', (err, userReturn) => {
  //     if (err) {
  //       req.flash('error', 'Login Failed. Mysterious...');
  //       res.redirect('/auth/login');
  //     }
  //     if (!userReturn) {
  //       req.flash('error', 'Login Failed. User not found');
  //       res.redirect('/auth/login');
  //     }
  //     if (userReturn) {
  //       login(userReturn, req, res);
  //     }
  //   })(req, res, next);
  // },

  // WILL BE REPLACED WITH TOKEN REFRESH EXPIRATION SYSTEM
  // logout_a_user: (req, res) => {
  //   req.logout();
  //   res.redirect('/');
  // },
};
