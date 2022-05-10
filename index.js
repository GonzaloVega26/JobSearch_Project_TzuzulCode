const {PORT} = require("./config/index")
const express = require('express')
const {connection} = require("./config/db")


const users = require("./routes/userRoutes")
const auth = require("./routes/authRoutes")
const jobs = require("./routes/jobRoutes")

connection()

const app = express()

//Middleware de JSON
app.use(express.json())

//Usando routes
users(app)
auth(app)
jobs(app)

app.listen(PORT,()=>{
    console.log("Listening on http://localhost:"+PORT)
})
