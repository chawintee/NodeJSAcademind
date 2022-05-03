const express = require("express");

const app = express()

app.use((req,res,next) => {
    console.log(`This is first middlewear`);
    next();
})

app.use((req,res,next) => {
    console.log(`This is second middlewear`);
    res.send('<h1> This is test in second middlewear </h1>');
})

// app.use('/users', (req,res,next) => {
//     res.send('<h1> This is user page </h1>')
// })

// app.use('/', (req,res,next) => {
//     res.send('<h1> This is first page </h1>')
// })

app.listen(3000) 