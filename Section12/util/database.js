const path = require('path')
const dotenv = require('dotenv')
dotenv.config({path: path.join(__dirname, "..", `.env.${process.env.NODE_ENV}`)})
const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', `${process.env.DATABASE_PASSWORD}`, {
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = sequelize