require("dotenv").config()


const config =  {
    NODE_ENV: process.env.NODE_ENV,
    PORT:process.env.PORT    
}

module.exports = config