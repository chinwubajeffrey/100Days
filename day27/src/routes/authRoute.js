const express = require("express");
const router = express.Router();
const {
  login,
  logout,
  register,
  refresh,
} = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/me", authMiddleware, (req, res, next) => {
  res.json(req.user);
});

router.post("/refresh", refresh);

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

module.exports = router;
