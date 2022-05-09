const express = require('express')
const app = express()

const path = require('path')

const bodyParser = require('body-parser')

app.set('view engine', 'ejs')
app.set('views','views')

const rootDir = require('./utils/path')

app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join(rootDir , 'public')))

const indexRoute = require('./routes/index')
const usersRoute = require('./routes/users')

app.use(indexRoute)
app.use('/users', usersRoute)

app.use('/', (req,res)=>{
    res.send('<h1>Not Found</h1>')
})

app.listen('3000', ()=> {
    console.log("server listening in port:3000");
})