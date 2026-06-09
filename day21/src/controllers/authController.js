const prisma = require("../lib/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

async function register(req, res, next) {
  try {
    const { email, password } = req.body;
    const checkUseremail = await prisma.user.findUnique({
      where: { email: email },
    });

    if (checkUseremail) {
      return res.status(400).json(`User exists already`);
    }
    const hashedPass = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email: email,
        password: hashedPass,
      },
    });
    res.status(201).json({
      id: newUser.id,
      email: newUser.email,
    });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const findUser = await prisma.user.findUnique({
      where: { email: email },
    });
    if (!findUser) {
      return res.status(401).json(`Invalid Credentials`);
    }
    const checkPass = await bcrypt.compare(password, findUser.password);
    if (!checkPass) {
      return res.status(401).json(`Invalid Credentials`);
    }

    const accessToken = jwt.sign(
      { userId: findUser.id, email: findUser.email },
      JWT_SECRET,
      { expiresIn: "15m" },
    );

    const refreshToken = jwt.sign(
      { userId: findUser.id, email: findUser.email },
      JWT_REFRESH_SECRET,
      { expiresIn: "7d" },
    );
    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
      })
      .json({ accessToken });
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login };
