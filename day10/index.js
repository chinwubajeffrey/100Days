const express = require("express");
const app = express();

function logger(req, res, next) {
  console.log(req.method, req.url);
  next();
}

function requireAuth(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).json("Unauthorized");
  }

  next();
}

app.use(express.json());
app.use(logger);

const notes = [
  { id: 1, text: "Buy shit" },
  { id: 2, text: "Read Shite" },
  { id: 3, text: "Sleep " },
];

app.get("/notes", (req, res) => {
  res.json(notes);
});

app.post("/notes", requireAuth, (req, res) => {
  const newText = req.body.text;
  const newNote = { id: notes.length + 1, text: newText };
  notes.push(newNote);
  res.json(newNote).status(201);
});

function errorHandler(err, req, res, next) {
  res.status(500).json(err);
}

app.listen(3000, () => console.log("Server running on port 3000"));
