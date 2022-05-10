const express = require("express");
const JobServices = require("../services/jobServices");
const authValidation = require("../middlewares/authValidation");


function jobs(app) {
  const router = express.Router();
  const jobServ = new JobServices();

  app.use("/api/jobs", router);

  router.get("/", async (req, res) => {
    const jobs = await jobServ.getAll(); // Array de usuarios
    return res.json(jobs);
  });

  

  router.post("/", async (req, res) => {
    const job = await jobServ.create(req.body);
    return res.json(job);
  });

  router.put("/:id", async (req, res) => {
    const job = await jobServ.update(req.params.id, req.body);
    return res.json(job);
  });

  router.delete("/:id", async (req, res) => {
    const job = await jobServ.delete(req.params.id);
    return res.json(job);
  });
}

module.exports = jobs;
