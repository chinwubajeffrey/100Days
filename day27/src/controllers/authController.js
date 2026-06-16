require("dotenv").config();
const prisma = require("../prismaClient");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const JWT_SECRET = process.env.JWT_SECRET;

async function register(req, res, next) {
  const { email, password } = req.body;
  try {
    const checkEmail = await prisma.user.findUnique({
      where: { email: email },
    });
    if (checkEmail) {
      return res.status(409).json(`The email has already been taken`);
    }
    const hash = await bcrypt.hash(password, 10);

    const createUser = await prisma.user.create({
      data: {
        email: email,
        password: hash,
      },
    });
    res.status(201).json({
      userId: createUser.id,
      UserEmail: createUser.email,
    });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  const { password, email } = req.body;
  try {
    const findEmail = await prisma.user.findUnique({
      where: { email: email },
    });
    if (!findEmail) {
      return res.status(404).json(`email not found`);
    }

    const checkPass = await bcrypt.compare(password, findEmail.password);
    if (!checkPass) {
      return res.status(401).json(`Login failed, Invalid credentials`);
    }
    const accessToken = jwt.sign(
      { id: findEmail.id, email: email },
      process.env.JWT_SECRET,
      { expiresIn: "15m" },
    );
    const refreshToken = jwt.sign(
      { id: findEmail.id, email: email },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" },
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      id: findEmail.id,
      email: email,
      accessToken: accessToken,
    });
  } catch (err) {
    next(err);
  }
}

function logout(req, res) {
  res.clearCookie("refreshToken");
  res.status(200).json({
    message: `Successfully Logged Out`,
  });
}

function refresh(req, res, next) {
  const refreshToken = req.cookies.refreshToken;
  try {
    if (!refreshToken) {
      return res.status(401).json({
        message: `No refresh token`,
      });
    }

    const verifyToken = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    if (!verifyToken) {
      return res.status(401).json({
        message: `Invalid Refresh Token`,
      });
    }
    const newSign = jwt.sign(
      { userId: verifyToken.id, UserEmail: verifyToken.email },
      JWT_SECRET,
      {
        expiresIn: "15m",
      },
    );

    return res.status(200).json(newSign);
  } catch (error) {
    next(error);
  }
}

module.exports = { login, logout, register, refresh };
