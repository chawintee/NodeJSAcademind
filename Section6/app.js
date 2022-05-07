const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.set('view engine', 'pug')
app.set('views', 'views')

const adminData = require('./routes/admin')
const shopRouter = require('./routes/shop')
const { request } = require('express')

app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin',adminData.router)
app.use(shopRouter)

app.use((req,res,next) => {
    res.sendFile(path.join(__dirname, 'views', 'not-found.html'))
})

app.listen(3000)