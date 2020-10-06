const repo = require('../data/authRepository');
const authHelper = require('../authentication/authHelper');
const authenticator = require('../authentication/authenticator');

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
  register_a_user_post: async (req, res) => {
    const user = await authHelper.createEncryptedUser(req.body.username, req.body.password);
    repo.InsertUser(user)
      .then(() => {
        authenticator.authenticate(req.body.username, req.body.password)
          .then((userReturn) => {
            res.status(201);
            res.json({
              message: 'Registration Succesful',
              user: userReturn
            });
          })
          .catch((err) => {
            res.status(500).send({ error: err });
          });
      })
      .catch((err) => {
        let errMsg = err;
        if (err.code === 11000) {
          errMsg = 'That Username Is Already Taken';
        }
        res.status(500).send(errMsg);
      });
  }
};

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
