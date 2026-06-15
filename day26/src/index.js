require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  }),
);
app.use(cookieParser());

app.use("/api/auth", authRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
