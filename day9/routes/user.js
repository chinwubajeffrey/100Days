const express = require("express");
const router = express.Router();

let users = [
  { id: 1, name: "Jeffrey" },
  { id: 2, name: "Chidi" },
  { id: 3, name: "Amara" },
];

router.get("/", (req, res) => {
  res.json({ users });
});

router.get("/:id", (req, res) => {
  const userId = Number(req.params.id);
  const findUser = users.find((u) => u.id === userId);
  if (findUser) {
    res.send(findUser);
  } else {
    res.status(404).send("Nigga where you at");

    return;
  }
  //   res.send(`User: ${userId}`);
});

router.post("/", (req, res) => {
  const newUser = req.body;
  const newObj = { id: users.length + 1, name: newUser.name };
  users.push(newObj);
  res.send(`Created new user, username is ${newObj.name}`);
});

router.put("/:id", (req, res) => {
  const userId = Number(req.params.id);
  const body = req.body;
  let findUser = users.find((u) => u.id === userId);
  if (findUser) {
    findUser.name = body.name;
    res.send(
      `The updated name is for userId${findUser.id} is ${findUser.name}`,
    );
  } else {
    res.status(404).send("User not found");
  }
});

router.delete("/:id", (req, res) => {
  const userId = Number(req.params.id);
  users = users.filter((u) => u.id !== userId);
  res.send(`Deleted user${userId}`);
});

module.exports = router;
