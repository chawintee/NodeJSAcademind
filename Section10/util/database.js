const dotenv = require('dotenv')
const path = require('path')
dotenv.config({path:path.join(__dirname,"..",`.env.${process.env.NODE_ENV}`)})

const mysql = require('mysql2')
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node-complete',
    password: process.env.DATABASE_PASSWORD

})

module.exports = pool.promise()