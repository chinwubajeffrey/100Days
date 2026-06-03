import "dotenv/config";
import express from "express";
import cors from "cors";

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV;

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.get("/message", (req, res, next) => {
  return res.status(200).json({
    message: "The message was sent well",
  });
});

function errMiddle(err, req, res, next) {
  res.status(400).json({
    status: res.statusCode(500),
    message: err.message,
  });
  app.use(errMiddle());
}

app.listen(PORT, () => {
  console.log(`The app is running  on port ${PORT}`);
});
