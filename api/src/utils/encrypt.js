const Crypto = require('crypto-js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/** Hash data */
module.exports.encrypt = (value) =>
  Crypto.AES.encrypt(value, process.env.HASH_KEY).toString();

module.exports.decrypt = (value) => {
  const bytes = Crypto.AES.decrypt(value, process.env.HASH_KEY);
  return bytes.toString(Crypto.enc.Utf8);
};

module.exports.hashedPassword = async (password) =>
await bcrypt.hash(password, await bcrypt.genSalt());
module.exports.createToken = async (value, time) => {
  const token = await jwt.sign(value, process.env.JWT_SECRET, {
    expiresIn: time,
    issuer: 'Team_stats',
  });
  return token;
};
