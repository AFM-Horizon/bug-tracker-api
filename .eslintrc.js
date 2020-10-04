module.exports = {
  // watch this for explaining why some of this is here
  env: {
    mocha: true
  },
  extends: 'airbnb-base',
  rules: {
    'no-underscore-dangle': 'off',
    'comma-dangle': 'off',
    'no-restricted-syntax': ['error', 'LabeledStatement', 'WithStatement']
  }
};
