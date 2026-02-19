const crypto = require('crypto');

const pwList = ['user01_password', 'user02_password', 'user03_password']; // test用

const makeSalt = () => crypto.randomBytes(6).toString('hex');

const makeHashedPW = (salt, pw) => {
  const hash = crypto.createHash('sha256');
  return hash.update(`${salt}${pw}`).digest('hex');
};

module.exports = { pwList, makeSalt, makeHashedPW };
