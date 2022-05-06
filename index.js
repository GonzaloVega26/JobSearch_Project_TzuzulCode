const {PORT} = require("./config/index")
const express = require('express')
const {connection} = require("./config/db")


const users = require("./routes/userRoutes")

connection()

const app = express()

//Middleware de JSON
app.use(express.json())

//Usando routes
users(app)

app.listen(PORT,()=>{
    console.log("Listening on http://localhost:"+PORT)
})
