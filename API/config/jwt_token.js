const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.signJwt = (payload) => {
  return jwt.sign(
    payload,
    process.env.ACCESS_TOKEN_SECRET
  );
};

exports.verifyJwt = (token) => {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
};
