const express = require('express');

const port = 8080;

const app = express();

const feedRoutes = require('./routes/feed.js')


app.use('/feed', feedRoutes)

app.use('/test', (req, res, next) => {
    res.send({
        message: "Hello, world test"
    })
})







app.listen(port , () => {
    console.log(`server running in http://127.0.0.1:${port}`);
    
} )