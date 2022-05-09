const express = require('express')
const router = express.Router()
const users = []

router.get('/', (req,res)=>{
    res.render('users', {pageTitle:"Users Page", users:users})
})

router.post('/add-users', (req,res)=>{
    console.log(req?.body.userName);
    users.push({userName: req?.body.userName})
    res.redirect('/users')
})

module.exports = router