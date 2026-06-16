require("dotenv").config();
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

function authMiddleware(req, res, next) {
  const authToken = req.headers.authorization;
  if (!authToken) {
    return res.status(401).json("You are unauthorized");
  }
  const token = authToken.split(" ")[1];
  try {
    const validToken = jwt.verify(token, JWT_SECRET);
    req.user = validToken;
    next();
  } catch (err) {
    res.status(401).json({
      errStatus: 401,
      message: "Header tampered with",
    });
  }
}

module.exports = authMiddleware;
