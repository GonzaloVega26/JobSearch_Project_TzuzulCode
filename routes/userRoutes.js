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
    const user = await userServ.getOneUser(req.user);
    if (user) {
      //Making two separate consult because the lookup operator don't work
      const jobsId = user.jobs_applicated;
      const jobs = await jobServ.getAllWithCondition({"_id": jobsId})
      if (jobs) return res.json(jobs)

      return res.json({
        error:true,
        message: "Jobs Not Found"
      })
    }

    return res.json({
      error: true,
      message: "User Not Found",
    });
  });


  router.put("/update-profile/:id", authValidation, async (req, res) => {
    const user = await userServ.update(req.params.id, req.body);
    return res.json(user);
  });

  router.delete("/delete/:id", authValidation, async (req, res) => {
  
    if (req.user.role === "admin") {
    const user = await userServ.delete(req.params.id);
    return res.json(user);
    }
    if(req.user._id === req.params.id){
     const user = await userServ.delete(req.params.id);
     return res.json(user);
    }

    return res.status(403).json({
      error:true,
      message: "Insufficient Permissions"
    })
  });

  router.get("/search-user/:email", authValidation, async (req, res) => {
    
    const user = await userServ.getOneUser({"email": req.params.email});
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
