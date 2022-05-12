const {PORT} = require("./config/index")
const morgan = require('morgan')
const cors = require('cors')
const express = require('express')
const {connection} = require("./config/db")


const users = require("./routes/userRoutes")
const auth = require("./routes/authRoutes")
const jobs = require("./routes/jobRoutes")

connection()

const app = express()

//Middleware de JSON
app.use(cors({
    origin:["http://localhost:3000"]
}))
app.use(express.json())
app.use(morgan('tiny')) 
//Usando routes
users(app)
auth(app)
jobs(app)

app.listen(PORT,()=>{
    console.log("Listening on http://localhost:"+PORT)
})
