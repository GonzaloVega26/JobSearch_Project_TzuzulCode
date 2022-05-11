require("dotenv").config()


const config =  {
    NODE_ENV: process.env.NODE_ENV,
    PORT:process.env.PORT,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
    dbUsername: process.env.DB_USERNAME,
    jwtSecret:process.env.JW_SECRET,
    adminSecret:process.env.ADMIN_SECRET,
    adminEmail:process.env.ADMIN_EMAIL,
    adminPassword:process.env.ADMIN_PASSWORD,
}

module.exports = config