const prisma = require("../lib/prisma");
const bcrypt = require("bcryptjs");

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
module.exports = register;
