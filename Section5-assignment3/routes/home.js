const express = require('express')
const router = express.Router()

const path = require('path')
const rootDir = require('../utils/path')

router.get('/', (req,res)=>{
//   res.sendFile(path.join('..',__dirname, 'views', 'home.html'))
  res.sendFile(path.join(rootDir, 'views', 'home.html'))
})

module.exports = router
