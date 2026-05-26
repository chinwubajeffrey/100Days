const { verifyAccessToken } = require("../utils/jwt");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        status: "error",
        message: "No token provided. Please log in.",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = verifyAccessToken(token);

    const user = await User.findById(decoded.sub);

    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "User no longer exists.",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        status: "error",
        message: "Token expired. Please refresh.",
        code: "TOKEN_EXPIRED",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        status: "error",
        message: "Invalid token.",
      });
    }

    res.status(500).json({ status: "error", message: "Something went wrong." });
  }
};

module.exports = { protect };
