/* eslint-disable no-console */
/* eslint-disable prefer-promise-reject-errors */
const repository = require('../data/authRepository');
const authHelper = require('./authHelper');

module.exports = {
  authenticate: (username, password) => {
    const prom = (resolve, reject) => {
      repository.GetUser({ username })
        .then((dbUser) => {
          if (!dbUser) {
            reject(new Error('User Is Null'));
          } else {
            authHelper.comparePassword(password, dbUser.password)
              .then((result) => {
                if (!result) {
                  reject(new Error('Incorrect Password'));
                } else {
                  resolve(dbUser);
                }
              })
              .catch((err) => {
                reject(err);
              });
          }
        })
        .catch((err) => {
          reject(err);
        });
    };
    return new Promise(prom);
  },
};
