const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

const adminData = require('./routes/admin')
const shopRouter = require('./routes/shop')
const errorControllers = require('./controllers/error')
const { request } = require('express')

app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin',adminData)
app.use(shopRouter)

app.use(errorControllers.getError)

app.listen(3000)