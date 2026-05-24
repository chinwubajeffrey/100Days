//for cjs

const express = require("express");
const { add } = require("./math");

const app = express();
app.use(express.json());

app.get("/add", (req, res) => {
  const sum = add(Number(req.query.a), Number(req.query.b));
  res.send(sum);
});

// for ESM

// import express from "express";
// import { add, greet, times } from "./math.js";

// const app = express();
// app.use(express.json());

// app.get("/hello/:name", (req, res) => {
//   const message = greet(req.params.name || "stranger");
//   res.json({ message });
//   console.log(message);
// });

// app.get("/add", (req, res) => {
//   const sum = add(Number(req.query.a), Number(req.query.b));
//   console.log(sum);
//   res.json({ sum });
// });

// app.get("/user/:id", (req, res) => {
//   const userId = req.params.id;

//   res.send(`userId = ${userId}`);
// });

// app.get("/mult", (req, res) => {
//   const mult = times(req.query.a, req.query.b);

//   res.send(mult);
// });

// app.listen(3000, () => console.log("App running on port 3000"));

app.post("/login", (req, res) => {
  const { email, password, user } = req.body;
  res.json(`message: Welcome ${user}`);
});

app.listen(3000, console.log("The port is running on 3000"));
