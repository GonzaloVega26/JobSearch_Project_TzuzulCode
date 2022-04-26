const {PORT} = require("./config/index")
const express = require('express')

const app = express()

app.use(express.json())


app.listen(PORT,()=>{
    console.log("Listening on http://localhost:"+PORT)
})