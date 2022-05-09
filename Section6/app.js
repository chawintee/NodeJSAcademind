const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')
const expressHbs = require('express-handlebars')

const app = express()

app.engine('hbs', expressHbs({layoutsDir: 'views/layouts/', defaultLayout: 'main-layout', extname: 'hbs'}))
app.set('view engine', 'hbs')
app.set('views', 'views')

const adminData = require('./routes/admin')
const shopRouter = require('./routes/shop')
const { request } = require('express')

app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin',adminData.router)
app.use(shopRouter)

app.use((req,res,next) => {
    res.status(404).render('not-found', {pageTitle: "Page not Found"})
})

app.listen(3000)