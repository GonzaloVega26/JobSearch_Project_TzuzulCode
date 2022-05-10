const express = require("express");
const UserServices = require("../services/userServices");
const JobServices = require("../services/jobServices")
const authValidation = require("../middlewares/authValidation");
const roleValidation = require("../middlewares/roleValidation");

function users(app) {
  const router = express.Router();
  const userServ = new UserServices();
  const jobServ = new JobServices();

  app.use("/api/users", router);

  router.get("/", authValidation, roleValidation, async (req, res) => {
    const users = await userServ.getAll(); // Array de usuarios

    return res.json(users);
  });

  router.post("/search", async (req,res)=>{
    const users = await userServ.searchByFields(req.body)
    return res.json(users)
  })

  router.post("/application/:idjob",authValidation, async (req,res)=>{
    const idJob = req.params.idjob
    //const user = await userServ.find(req.user)
    const updateResult = await userServ.update(req.user.id, {$push: { jobs_applicated: idJob }})
    return res.json(updateResult)
  })

  router.get("/myjobs", authValidation, async (req, res) => {
    const user = await userServ.getOneById(req.user.id);
    console.log(req.user)
    if (user) {
      //Making two separate consult because the lookup operator don't work
      const jobsId = user.jobs_applicated;
      const jobs = await jobServ.getAllWithCondition({"_id": jobsId})
      console.log(jobs)
      if (jobs) return res.json(jobs)
    }

    return res.json({
      error: true,
      message: "User not found",
    });
  });


  router.post("/", async (req, res) => {
    const user = await userServ.create(req.body);
    return res.json(user);
  });

  router.put("/:id", async (req, res) => {
    const user = await userServ.update(req.params.id, req.body);
    return res.json(user);
  });

  router.delete("/:id", async (req, res) => {
    const user = await userServ.delete(req.params.id);
    return res.json(user);
  });

  router.get("/:email",authValidation, async (req, res) => {
    const user = await userServ.getOneByEmail(req.params.email); // One User
    
    if (req.user.role === "admin") {
      return res.json(user);
    }
    
    const { name, age, email, occupation } = user;
    return res.json({
      name,
      age,
      email,
      occupation,
    });
  });
}

module.exports = users;
