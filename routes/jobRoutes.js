const express = require("express");
const JobServices = require("../services/jobServices");
const UserServices = require("../services/userServices");
const authValidation = require("../middlewares/authValidation");

function jobs(app) {
  const router = express.Router();
  const jobServ = new JobServices();
  const userServ = new UserServices();

  app.use("/api/jobs", router);
  router.use(authValidation);

  router.get("/my-jobs-created", async (req, res) => {
    
    if (req.user.role === "employer" || req.user.role === "admin") {
      const jobsCreated = await jobServ.getAllWithCondition({
        employer_id: req.user._id,
      });
      if (jobsCreated) {
        return res.json(jobsCreated);
      }
      return res.json({ error: true, message: "No jobs" });
    }

    return res.json({ error: true, message: "Insufficient Permission" });
  });

  router.get("/", async (req, res) => {
    const jobs = await jobServ.getAll(); // Array de usuarios
    return res.json(jobs);
  });

  router.get("/:id", async (req, res) => {
    const job = await jobServ.getOneById(req.params.id);
    if(job) return res.json(job);
    return res.json({
      error:true,
      message: "Job Not Found"
    })
  });

  

  router.get("/applications/:id", async (req, res) => {
    const job = await jobServ.getOneById(req.params.id);
    if (job) {
      //Only employer who created the job o admin can see applicants
      if (req.user._id === job.employer_id || req.user.role === "admin") {
        const users = await userServ.getAllWithCondition({
          _id: job.applications,
        });
        return res.json(users);
      }
    }
    return res.json({
      error: true,
      message: "Job Not Found",
    });
  });

  router.post("/", async (req, res) => {
    console.log(req.user.role)
    if (req.user.role === "employer" || req.user.role == "admin") {
      req.body["employer_id"] = req.user._id
      
      //Only employers and admins can create
      const job = await jobServ.create(req.body);
      return res.json(job);
    }
    return res.json(insufficientPermissions());
  });

  router.post("/search-job/titlte", async (req, res) => {
        
      const jobs = await jobServ.getAllRelatedToTitle(req.body.title)
      return res.json(jobs);
    
  });
  router.post("/search-job/requirements", async (req, res) => {
        
      const jobs = await jobServ.getAllRelatedToRequirements(req.body.requirements)
      return res.json(jobs);
    
  });
  router.post("/search-job/salary", async (req, res) => {
        
      const jobs = await jobServ.getAllRelatedToSalary(req.body)
      return res.json(jobs);
    
  });

  router.put("/update/:id", async (req, res) => {
    if(req.user.role === "employer" || req.user.role == "admin") {
      //Only employers and admins can modify
      const job = await jobServ.getOneById(req.params.id);
     
      if (job) {
        
        //Only employers who creates the job or admins can modify
        if (req.user._id === job.employer_id || req.user.role === "admin") {
          const jobUpdated = await jobServ.update(req.params.id, req.body);
          return res.json(jobUpdated);
        }
        return res.json(insufficientPermissions());
        
      }
      return res.json({
        error:true,
        message: "Job Not Found"
      });
    }
    return res.json(insufficientPermissions());
  });

  router.delete("/delete/:id", async (req, res) => {
    if (req.user.role !== "applicant") {
      //Only employers and admins can delete
      const job = await jobServ.getOneById(req.params.id);
      if (job) {
        //Only employers who creates the job or admins can delete
        if (req.user._id === job.employer_id || req.user.role === "admin") {
          const jobDeleted = await jobServ.delete(req.params.id);
          return res.json(jobDeleted);
        }
      }
    }
    return res.json(insufficientPermissions());
  });
}
function insufficientPermissions() {
  return {
    error: true,
    message: "Insufficient Permission",
  };
}
module.exports = jobs;
