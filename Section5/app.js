const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const adminRouter = require('./routes/admin')
const shopRouter = require('./routes/shop')
const { request } = require('express')

app.use(bodyParser.urlencoded({extended:false}))

app.use('/admin',adminRouter)
app.use(shopRouter)

app.use((req,res,next) => {
    res.sendFile(path.join(__dirname, 'views', 'not-found.html'))
})

app.listen(3000)