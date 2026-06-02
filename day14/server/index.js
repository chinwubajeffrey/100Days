import "dotenv/config";
import express from "express";
import cors from "cors";

const PORT = process.env.PORT;
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.get("/api/data", (req, res) => {
  res.json({
    message: "This is the message",
    timestamp: new Date().toISOString(),
  });
});

app.post("/api/echo", (req, res) => {
  const { text } = req.body;
  if (!text) {
    res.status(400).json({
      error: "Input the text",
    });
  } else {
    res.json({ echo: text });
  }
});

app.get("/api/secret", (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: "You're not authorized" });
  } else {
    return res.status(200).json({ message: "You are authorized" });
  }
});

app.listen(PORT, () => console.log(`Nigga is running on that port ${PORT}`));
