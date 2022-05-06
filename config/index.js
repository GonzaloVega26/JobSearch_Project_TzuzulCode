require("dotenv").config()


const config =  {
    NODE_ENV: process.env.NODE_ENV,
    PORT:process.env.PORT,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
    dbUsername: process.env.DB_USERNAME,
    jwtSecret:process.env.JW_SECRET
}

module.exports = config