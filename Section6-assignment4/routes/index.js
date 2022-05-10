const express = require('express')
const router = express.Router()
const path = require('path')

router.get('/', (req,res) => {
    res.render('index', {pageTitle:"Home page",})
})


module.exports = router