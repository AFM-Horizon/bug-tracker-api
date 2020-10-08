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
            console.log('USER NULL');
            reject(new Error('User Is Null'));
          } else {
            authHelper.comparePassword(password, dbUser.password)
              .then((result) => {
                if (!result) {
                  console.log('Pawword Dud');
                  reject(new Error('Incorrect Password'));
                } else {
                  console.log('All G!');
                  resolve(dbUser);
                }
              })
              .catch((err) => {
                console.log(`Random${err}`);
                reject(err);
              });
          }
        })
        .catch((err) => {
          console.log(`Random2${err}`);
          reject(err);
        });
    };
    return new Promise(prom);
  },
};
