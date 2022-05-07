const express = require('express')
const app = express()
const path = require('path')

const bodyParser = require('body-parser')
const urlencoded = require('body-parser/lib/types/urlencoded')

app.use(bodyParser.urlencoded({extended:false}))

const homeRoute = require('./routes/home')
const usersRoute = require('./routes/users')

app.use(express.static(path.join(__dirname, 'public')))

const rootDir = require('./utils/path')

const router = express.Router()

app.use(homeRoute)
app.use('/users',usersRoute)

app.listen(3000, ()=> {
    console.log('server is running in port 3000');
})