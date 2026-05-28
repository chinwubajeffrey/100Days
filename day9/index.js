const express = require("express");
const UserRouter = require("./routes/user");

const app = express();

app.use(express.json());
app.use("/users", UserRouter);

app.listen(3000, () => console.log("App is running on port 3000"));
