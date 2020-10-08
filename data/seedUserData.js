const bcrypt = require('bcryptjs');
const repo = require('./authRepository');

module.exports = {
  seed: async () => {
    repo.DeleteCollection();
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash('password', salt);
    return repo.InsertUser({
      username: 'Charmander',
      password: hash
    });
  }
};
