const jwt = require("jsonwebtoken");

const getnerateAccessToken = (userId) => {
  return jwt.sign({ sub: userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
  });
};

const generateRefreshToken = (userId) => {
  return jwt.sign({ sub: userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
  });
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
};

const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
};

module.exports = {
  getnerateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
