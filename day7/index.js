require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
});
