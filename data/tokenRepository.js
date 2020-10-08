const tokenSchema = require('./tokenSchemas');
const database = require('./database');

module.exports = (() => {
  const TokenModel = tokenSchema.tokenModel;

  database.GetDbInstance();

  async function _getToken(username) {
    return TokenModel.findOne({ username });
  }

  async function _insertToken(token) {
    const tokenModel = new TokenModel(token);
    return tokenModel.save();
  }

  async function _deleteToken(username) {
    await TokenModel.deleteOne({ username });
  }

  async function _deleteCollection() {
    await TokenModel.deleteMany();
  }

  async function _getAllTokens() {
    return TokenModel.find();
  }

  return {
    GetToken(username) {
      return _getToken(username);
    },
    InsertToken(token) {
      return _insertToken(token);
    },
    DeleteToken(username) {
      return _deleteToken(username);
    },
    DeleteCollection() {
      return _deleteCollection();
    },
    GetAll() {
      return _getAllTokens();
    }
  };
})();
