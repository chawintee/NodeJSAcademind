const express = require('express');
const bodyParser = require('body-parser')

const port = 8080;

const app = express();

const feedRoutes = require('./routes/feed.js');

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
// app.use(bodyParser.json()); //application/json

app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next()
})

app.use('/feed', feedRoutes)

app.use('/test', (req, res, next) => {
    res.send({
        message: "Hello, world test"
    })
})







app.listen(port , () => {
    console.log(`server running in http://127.0.0.1:${port}`);
    
} )