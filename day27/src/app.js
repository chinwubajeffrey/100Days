const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const authRoute = require("./routes/authRoute");

app.use(cookieParser());
app.use(express.json());
app.use("/auth", authRoute);

app.get("/", (req, res) => {
  res.json(`This is the home page?`);
});

module.exports = app;
