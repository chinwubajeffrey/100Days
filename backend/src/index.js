import dotenv from "dotenv";
import connectDB from "./config/database.js";
import app from "./app.js";

dotenv.config({
  path: "./.env",
});

const startServer = async () => {
  try {
    await connectDB();
    app.on("error", (error) => {
      console.log("error", error);
      throw error;
    });

    app.listen(process.env.PORT || 4000, () =>
      console.log(`The app is live on port ${process.env.PORT}`),
    );
  } catch (err) {
    console.log(`The connection failed`, err);
  }
};

startServer();
