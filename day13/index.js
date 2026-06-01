require("dotenv").config();
const express = require("express");
const AppError = require("./AppError");
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

const projects = [
  {
    id: 1,
    status: "complete",
    clientName: "Velto",
    budget: "300k",
  },
  {
    id: 2,
    status: "complete",
    clientName: "Nigachu",
    budget: "300k",
  },
  {
    id: 3,
    status: "complete",
    clientName: "Leona",
    budget: "300k",
  },
  {
    id: 4,
    status: "complete",
    clientName: "Ms",
    budget: "300k",
  },
  {
    id: 5,
    status: "complete",
    clientName: "Bigminds",
    budget: "300k",
  },
];

app.get("/api/projects", (req, res) => {
  res.json(projects);
});

app.get("/api/projects/:id", (req, res, next) => {
  const found = projects.find((u) => u.id === Number(req.params.id));
  if (found) {
    res.json(found);
  } else {
    next(new AppError("Project not found", 404));
  }
});

app.post("/api/projects", (req, res, next) => {
  const { clientName, budget } = req.body;
  if (!clientName || !budget) {
    next(new AppError("Client Name and Budget is required", 400));
  } else {
    const newProject = {
      id: projects.length + 1,
      status: "Ongoing",
      clientName: clientName,
      budget: budget,
    };

    projects.push(newProject);
    res.status(201).json(newProject);
  }
});

const errMiddle = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const errMsg = err.isOperational ? err.message : "Something went wrong";

  res.status(statusCode).json({
    status: statusCode,
    message: errMsg,
  });
};

app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
app.use(errMiddle);
