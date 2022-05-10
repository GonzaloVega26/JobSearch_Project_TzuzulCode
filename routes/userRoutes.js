const express = require("express");
const UserServices = require("../services/userServices");
const authValidation = require("../middlewares/authValidation");
const roleValidation = require("../middlewares/roleValidation");

function users(app) {
  const router = express.Router();
  const userServ = new UserServices();

  app.use("/api/users", router);

  router.get("/", authValidation, roleValidation, async (req, res) => {
    const users = await userServ.getAll(); // Array de usuarios

    return res.json(users);
  });

  router.get("/:email",authValidation, async (req, res) => {
    const userEmail = req.params.email;
    const user = await userServ.getOneByEmail(userEmail); // One User
    
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

  router.post("/search", async (req,res)=>{
    const users = await userServ.searchByOccupation(req.body)
    return res.json(users)
  })

  router.get("/applicants", async (req,res)=>{

  })

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
}

module.exports = users;
