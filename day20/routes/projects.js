const express = require("express");
const prisma = require("../lib/prisma");

const router = express.Router();

router.post("/projects", async (req, res, next) => {
  try {
    const { title, clientId } = req.body;
    const newProject = await prisma.project.create({
      data: {
        title: title,
        clientId: clientId,
      },
    });
    res.status(201).json(newProject);
  } catch (err) {
    next(err);
  }
});

router.get("/projects", async (req, res, next) => {
  try {
    const projects = await prisma.project.findMany({
      include: { client: true },
    });
    res.status(200).json(projects);
  } catch (err) {
    next(err);
  }
});

router.put("/projects/:id", async (req, res, next) => {
  const { status } = req.body;
  const projectId = Number(req.params.id);
  try {
    const updated = await prisma.project.update({
      where: { id: projectId },
      data: { status: status },
    });
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
});

router.delete("/projects/:id", async (req, res, next) => {
  const projectId = Number(req.params.id);
  try {
    const deleted = await prisma.project.delete({
      where: { id: projectId },
    });
    res.status(200).json(`Project ${projectId} deleted successfully`);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
