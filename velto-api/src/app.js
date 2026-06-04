require("dotenv").config();
const express = require("express");
const cors = require("cors");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const projectsRouter = require("./routes/projects");

const app = express();
const PORT = process.env.PORT || 5000;
app.use(
  cors({
    origin: "*",
  }),
);
app.use(express.json());

app.use(logger);
app.use("/projects", projectsRouter);

app.use(errorHandler);
app.listen(PORT, () => console.log(`App is running on ${PORT}`));

module.exports = app;
