
const express = require("express")
const authValidation = require("../middlewares/authValidation")
const roleValidation = require("../middlewares/roleValidation")
const AuthService = require("../services/authServices")
const UserService = require("../services/userServices")
const {adminEmail,adminPassword,adminSecret} = require("../config")


function auth(app){
    const router = express.Router()
    const authServ = new AuthService()
    const userServ = new UserService()
    app.use("/api/auth",router)

    router.post("/login", async (req,res)=>{
        const token = await authServ.login(req.body)
        return res.json(token)
    })

    router.post("/signup",async (req,res)=>{
        if(req.body.role === "admin"){
            return res.status(403).json({
                error: true,
                message: "Insufficient Permission"
            })
        }
        const result = await authServ.signup(req.body)

        return res.status(result.error?400:200).json(result)
    })

    router.post("/admin-privilege/:email",authValidation, roleValidation, async (req,res)=>{
        const user = await userServ.getOneUser({"email":req.params.email})
        console.log(user)
        if(user){
            const result = await userServ.update(user.id,{$set:{role:"admin"}})
            
            console.log(result)
            if(result) {
                const {_id, name, email, role} = result
                return res.json({_id, name, email, role})
            }
        }

        return res.json({
            error: true,
            message: "User not Found"
        })
       
    })

    router.post("/first-admin/:secret", async (req,res)=>{
        
        if(req.params.secret === adminSecret){
            const admin = await authServ.signup({
                "name": "Admin Administrator",
                "email": adminEmail,
                "age": 999,
                "occupation": "Owner of Everything",
                "password" : adminPassword,
                "role": "admin",
                "knowledge": ["Everything"]
            })
            return res.json(admin)
        }

        return res.json({
            error: true,
            message: "Hey You!!! Beware"
        })
    })
}

module.exports = auth