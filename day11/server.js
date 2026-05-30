const express = require("express");
const app = express();

app.use(express.json());

const submissions = [];

app.post("/contact", (req, res) => {
  console.log(req.body);
  const newSubmission = {
    id: submissions.length + 1,
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
  };
  submissions.push(newSubmission);
  res
    .status(201)
    .json({ data: submissions[submissions.length - 1], message: "Sucess" });
});

app.get("/contact", (req, res) => {
  if (!req.query.name) {
    res.send(submissions);
  } else {
    let found = submissions.filter((sub) => sub.name === req.query.name);
    res.json(found);
  }
});

app.get("/contact/:id", (req, res) => {
  const id = Number(req.params.id);
  let foundedId = submissions.find((i) => i.id === id);
  if (!foundedId) {
    res.status(404).json("Id not found");
  } else {
    res.json(foundedId);
  }
});

app.listen(3000, () => console.log("App running on port 3000"));
