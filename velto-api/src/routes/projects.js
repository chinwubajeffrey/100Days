const express = require("express");
const { projects } = require("../data/store");
const router = express.Router();

router.get("/", (req, res) => {
  const status = req.query.status;
  if (status) {
    const completed = projects.filter((i) => i.status === status);
    res.status(200).json(completed);
  } else {
    res.status(200).json(projects);
  }
});

router.get("/:id", (req, res, next) => {
  const idNo = Number(req.params.id);
  const found = projects.find((i) => i.id === idNo);
  if (found) {
    res.status(200).json(found);
  } else {
    const err = {
      status: 404,
      message: "Project not found",
    };

    next(err);
  }
});

router.post("/", (req, res, next) => {
  const { status, budget, client, stage } = req.body;

  if (!client || !budget) {
    const err = {
      status: 400,
      message: "Add a budget and client in your request",
    };
    return next(err);
  }
  const newProject = {
    id: projects.length + 1,
    status: status,
    budget: budget,
    stage: stage,
    client: client,
  };
  projects.push(newProject);
  res.status(201).json(newProject);
});

router.put("/:id", (req, res, next) => {
  let find = projects.find((i) => i.id === Number(req.params.id));
  const { status, budget, client, stage } = req.body;
  if (!find) {
    const err = {
      status: 404,
      message: "Project not found",
    };
    return next(err);
  } else {
    let result = { ...find, ...req.body };
    projects[projects.indexOf(find)] = result;

    res.status(200).json(result);
  }
});

router.delete("/:id", (req, res, next) => {
  const projectIndex = projects.findIndex(
    (i) => i.id === Number(req.params.id),
  );
  if (projectIndex == -1) {
    const err = {
      status: 404,
      message: "Project not found",
    };
    return next(err);
  } else {
    projects.splice(projectIndex, 1);
    res.status(200).json({
      message: "Project deleted successfully",
    });
  }
});

module.exports = router;
