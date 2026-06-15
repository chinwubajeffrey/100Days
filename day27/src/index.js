require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");

const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    message: "Bitch ahh nigga",
  });
});

app.listen(PORT, () => console.log(`App running on port ${PORT}`));
