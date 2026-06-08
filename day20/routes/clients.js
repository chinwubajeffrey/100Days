const prisma = require("../lib/prisma");
const express = require("express");
const router = express.Router();

router.post("/clients", async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const newClient = await prisma.client.create({
      data: {
        name: name,
        email: email,
      },
    });
    res.json(newClient);
  } catch (err) {
    next(err);
  }
});

router.get("/clients", async (req, res, next) => {
  try {
    const clients = await prisma.client.findMany();
    res.json(clients);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
