require("dotenv").config();
const cors = require("cors");
const clientRouter = require("./routes/clients");
const projectRouter = require("./routes/projects");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: "*",
  }),
);
app.use("/", clientRouter);
app.use("/", projectRouter);

function errMiddle(err, req, res, next) {
  res.status(err.status).json({
    statusCode: err.status || 500,
    errMsg: err.message || "Something went wrong",
  });
}
app.use(errMiddle);
app.listen(PORT, () => {
  console.log(`App running on ${PORT}`);
});
