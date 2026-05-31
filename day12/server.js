require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 4000;
const APP_NAME = process.env.APP_NAME || "My API";
const SECRET_MESSAGE = process.env.SECRET_MESSAGE;
const MAINTENANCE_MODE = process.env.MAINTENANCE_MODE === "true";

const checkMaintain = (req, res, next) => {
  if (MAINTENANCE_MODE) {
    return res.status(503).json({
      status: "503 error",
      message: "Server currently on maintenance",
    });
  }
  next();
};

app.use(checkMaintain);

app.get("/", (req, res) => {
  res.json({
    app: APP_NAME,
    status: "running",
    environment: process.env.NODE_ENV || "Development",
  });
});

app.get("/secret", (req, res) => {
  if (!SECRET_MESSAGE) {
    return res.status(500).json(new Error("Secret message missing"));
  }
  res.json(SECRET_MESSAGE);
});

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    uptime: process.uptime(),
  });
});

app.listen(PORT, () =>
  console.log(
    `The port is running in ${PORT}, and the app's name is ${APP_NAME}`,
  ),
);
